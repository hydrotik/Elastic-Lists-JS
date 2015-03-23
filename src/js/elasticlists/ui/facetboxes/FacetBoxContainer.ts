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

module eu.stefaner.elasticlists.ui.facetboxes {
	import App = eu.stefaner.elasticlists.App;
	import Facet = eu.stefaner.elasticlists.data.Facet;
	import DefaultGraphicsFactory = eu.stefaner.elasticlists.ui.DefaultGraphicsFactory;

	import PushButton = com.bit101.components.PushButton;

	import Sprite = flash.display.Sprite;
	import Event = flash.events.Event;
	import MouseEvent = flash.events.MouseEvent;
	import TextField = flash.text.TextField;

	/**
	 *	Class description.
	 *
	 *	@langversion ActionScript 3.0
	 *	@playerversion Flash 9.0
	 *
	 *	@author moritz@stefaner.eu
	 *	@since  24.05.2008
	 */
	export class FacetBoxContainer extends Sprite { 

		public app : App;
		public title_tf : TextField;
		public bg : Sprite;
		public resetButton : PushButton;
		public facet : Facet;
		public facetBox : FacetBox;

		/**
		 *	@Constructor
		 */
		constructor(app : App) {
			super();
			this.initGraphics();
			this.app = app;
			app.addEventListener(App.FACETS_CHANGED, this.onFacetValuesLoaded);
			app.addEventListener(App.FILTERS_CHANGED, this.onFacetsStatsChanged);
		}

		/*override*/ public toString() : string {
			if(this.facet) {
				return "[FacetBoxContainer " + this.facet.label + "]";				
			} else {
				return "[FacetBoxContainer]";				
			}
		}

		public init(facet : Facet, facetBox : FacetBox) : void {
			trace("init " + facet);
			this.facet = facet;
			this.facetBox = facetBox;
			facetBox.facet = facet;
			this.title = facet.label.toUpperCase();
			
			this.addChild(facetBox);
				
			facetBox.addEventListener(this.FacetBox.SELECTION_CHANGE, this.onSelectionChange, false, 1, true);

			if(this.resetButton) {
				this.resetButton.addEventListener(MouseEvent.CLICK, this.onResetClick);
			}
			// rescale if scaled on stage
			this.initBounds();
			this.layout();
		}/*;*/

		private initGraphics() : void {
			if(!this.bg) {
				this.bg = DefaultGraphicsFactory.getFacetBoxContainerBackground();
				this.addChild(this.bg);
			}
			if(!this.title_tf) {
				this.title_tf = DefaultGraphicsFactory.getTitleTextField();
				this.addChild(this.title_tf);
			}
			/*
			if(!resetButton) {
				resetButton = DefaultGraphicsFactory.getButton(this, 0, 0, "reset");
				resetButton.width = 40;
			}
			 * 
			 */
		}

		private onResetClick(e : MouseEvent) : void {
			this.facetBox.reset();
		}

		private initBounds() : void {
			var w : number = this.width * this.scaleX;
			var h : number = this.height * this.scaleY;
			this.scaleX = this.scaleY = 1;
			this.width = Math.floor(w);
			this.height = Math.floor(h);
		}/*;*/

		private onFacetValuesLoaded(e : Event = null) : void {
			trace(this + ".onFacetValuesLoaded");
		}/*;*/

		private onFacetsStatsChanged(e : Event = null) : void {
			trace(this + ".onGlobalFacetValueStatsChanged");
			this.facetBox.updateStats();
		}/*;*/

		private onSelectionChange(e : Event = null) : void {
			//dispatchEvent(new Event("onSelectionChange"));
			trace(this + ".onSelectionChange");
			this.app.applyFilters();
		}/*;*/

		//--------------------------------------
		//  GETTER/SETTERS
		//--------------------------------------
		/*override*/ public set height( h : number ) {
			this.bg.height = h;
			this.layout();
		}

		protected layout() : void {
			this.title_tf.x = 2;
			this.title_tf.y = 2;
			
			if(this.facetBox) {
				this.facetBox.x = 2;
				this.facetBox.y = 22;
				this.facetBox.height = this.height - this.facetBox.y - 2;
				this.facetBox.width = this.width - 4;
			}
			if(this.resetButton) {
				this.resetButton.x = this.width - 2 - this.resetButton.width;
				this.resetButton.y = 2;
			}
		}

		/*override*/ public get height() : number {
			return this.bg.height;
		}

		/*override*/ public set width( w : number ) {
			this.bg.width = w;
			this.layout();
		}

		/*override*/ public get width() : number {
			return this.bg.width;
		}

		public set title( value : string ) {
			this.title_tf.text = value;
		}
	}
}