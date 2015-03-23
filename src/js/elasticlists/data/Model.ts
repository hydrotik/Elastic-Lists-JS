/*
   
Copyright 2010, Moritz Stefaner

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
   
 */

module eu.stefaner.elasticlists.data {	
	import App = eu.stefaner.elasticlists.App;

	import Logger = org.osflash.thunderbolt.Logger;

	import EventDispatcher = flash.events.EventDispatcher;
	import Dictionary = flash.utils.Dictionary;

	/**
	 *  Model
	 *	
	 *	manages ContentItem and Facet collections, filter states etc
	 *	
	 * 	@langversion ActionScript 3
	 *	@playerversion Flash 9.0.0
	 *
	 *	@author moritz@stefaner.eu
	 */
	export class Model extends EventDispatcher {

		public app : App;
		public facets : any[] = [];
		public facetValuesForContentItem : Dictionary = new Dictionary(true);
		public activeFilters : Dictionary = new Dictionary(true);
		public allContentItems : any[] = [];
		public filteredContentItems : any[] = [];
		protected allContentItemsForFacetValue : Dictionary = new Dictionary(true);
		protected contentItemsById : Dictionary = new Dictionary(true);
		public static ANDselectionWithinFacets : boolean = false;

		constructor(a : App) {
			this.app = a;
			this.init();
		}/*;*/

		public init() : void {
			this.facets = [];
			this.activeFilters = new Dictionary(true);
			this.facetValuesForContentItem = new Dictionary(true);
			this.allContentItems = [];
			this.filteredContentItems = [];
			this.allContentItemsForFacetValue = new Dictionary(true);
			this.contentItemsById = new Dictionary(true);
		}

		public hasActiveFilters() : boolean {
			return !(this.filteredContentItems.length == this.allContentItems.length);
		}

		// adds a facet
		public registerFacet(f : Facet) : Facet {
			if(this.facet(f.name)) {
				throw new Error("Cannot add facet, because it is already present: " + f.name);
				return;
			}
			f.model = this;
			this.facets.push(f);
			// prepare lookup map per facet value
			for each (var facetValue:FacetValue in f.facetValues) {
				this.allContentItemsForFacetValue[facetValue] = [];
			}

			return f;
		}

		// returns a facet by name
		public facet(name : string) : Facet {
			for each(var facet:Facet in this.facets) {
				if (facet.name == name) {
					return facet;
				}
			}
			return null;				
		}

		public updateGlobalStats() : void {
			for each (var facet:Facet in this.facets) {
				facet.calcGlobalStats();
			}
		}

		public updateLocalStats() : void {
			for each (var facet:Facet in this.facets) {
				facet.calcLocalStats();
			}
		}

		//---------------------------------------
		// CONTENTITEMS
		//---------------------------------------
		public createContentItem(id : string) : ContentItem {
			return this.getContentItemById(id) || this.addContentItem(this.app.createContentItem(id));
		}/*;*/

		public getContentItemById(id : string) : ContentItem {
			return this.contentItemsById[id];
		}

		// REVISIT: lookup should be moved to Facet object?
		public getAllContentItemsForFacetValue(f : FacetValue) : any[] {
			if(this.allContentItemsForFacetValue[f] == undefined) {
				this.allContentItemsForFacetValue[f] = [];
			}
			return this.allContentItemsForFacetValue[f];
		}

		public getNumContentItemsForFacetValue(f : FacetValue) : number {
			return this.getAllContentItemsForFacetValue(f).length;
		}

		// adds a content items
		private addContentItem(c : ContentItem) : ContentItem {
			if(!this.contentItemsById[c.id]) {
				this.allContentItems.push(c);
				this.contentItemsById[c.id] = c;
				this.facetValuesForContentItem[c] = new Array();
				return c;	
			} else {
				// TODO: adopt new values?
				return this.contentItemsById[c.id]; 
			}
		}/*;*/

		// short cut function with a lengthy name
		// will create facet value if necessary!
		public assignFacetValueToContentItemByName(contentItemOrId : any, facetName : string, facetValueName : string) : void {
			var contentItem : ContentItem = (<ContentItem>contentItemOrId ) || this.getContentItemById(contentItemOrId);
			var facet : Facet = facet(facetName);
			var facetValue : FacetValue = facet.facetValue(facetValueName);
			if(facetValueName == null) {
				throw new Error("facetValueName cannot be null");
			}
			if(facetValue == null) {
				facetValue = facet.createFacetValue(facetValueName);
			}
			this.assignFacetValueToContentItem(facetValue, contentItem);
		}		

		// REVISIT: lookup should be moved to Facet object
		public assignFacetValueToContentItem(f : FacetValue, c : ContentItem) : void {
			if(f == null || c == null) {
				throw new Error("*** NULL VALUE: assignFacetValueToContentItem " + f + " " + c);
			}
						
			if(this.allContentItemsForFacetValue[f] == undefined) {
				this.allContentItemsForFacetValue[f] = [];
			}
			
			this.allContentItemsForFacetValue[f].push(c);
			this.facetValuesForContentItem[c].push(f);
			c.facetValues[f] = true;
			/*
			// check if facetValue is hierarchical and has a parent
			var ff : HierarchicalFacetValue = f as HierarchicalFacetValue;
			if(ff != null && ff.hasParent()) {
				assignFacetValueToContentItem(ff.parentFacetValue, c);
			}
			 * 
			 */
		}/*;*/	

		//---------------------------------------
		// FILTERS
		//---------------------------------------
		public resetFilters() : void {
			for each(var facet:Facet in this.facets) {
				for each(var facetValue:FacetValue in facet.facetValues) {
					facetValue.selected = false;
				}
			}
			this.applyFilters();
		}/*;*/

		// gets selected filters from facets, stores them in activeFilters dict
		public updateActiveFilters() : void {
			this.activeFilters = new Dictionary();
			for each(var facet:Facet in this.facets) {
				facet.updateContentItemFilter();
				if(facet.filter.active) this.activeFilters[facet] = facet.filter;
			}
		}/*;*/

		// updates ContentItem states, filteredContentItems based on filters
		public applyFilters() : void {
			trace("Model.applyFilters");
			
			this.updateActiveFilters();
			var c : ContentItem;
			
			this.filteredContentItems = [];				
				
			for each(c in this.allContentItems) {
				if(this.contentItemMatchesFilters(c, this.activeFilters)) {
					c.filteredOut = false;
					this.filteredContentItems.push(c);
				} else {
					c.filteredOut = true;
				}
			}
			
			Logger.info("Model. onFilteredContentItemsChanged: " + this.filteredContentItems.length + " results");
		}/*;*/

		// tests if a contentitem matches all filters in passed filters dictionary 
		protected contentItemMatchesFilters(c : ContentItem, filters : Dictionary) : boolean {
			for each(var f:Filter in filters) {
				if(!f.match(c)) return false;				
			}	
			// all good
			return true;
		}

		public getTotalNumContentItemsForFacetValue(f : FacetValue) : number {
			return this.getAllContentItemsForFacetValue(f).length;
		}

		public getFilteredNumContentItemsForFacetValue(f : FacetValue) : number {
			// get all ContentItems
			var contentItems : any[] = this.getAllContentItemsForFacetValue(f);
			// count all which are not filtered out
			var count : number = 0;
			for each (var c:ContentItem in contentItems) {
				if(!c.filteredOut) {
					count++;
				}
			}
			return count;
		}
	}
}