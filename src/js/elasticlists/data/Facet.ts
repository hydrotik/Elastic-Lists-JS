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
	import Dictionary = flash.utils.Dictionary;

	/**
	export class Facet extends EventDispatcher {

		public static GEO : string = "GEO";
		public model : Model;
		public filter : Filter = new Filter();

		//---------------------------------------

		/*override*/ public toString() : string {

		//---------------------------------------

		// calculates numContentItems and localRatio
				f.distinctiveness = Math.log(f.localPercentage / f.globalPercentage);

		export function compareFacetValues(a : FacetValue,b : FacetValue) : number {

		//---------------------------------------

		public function createFacetValue(name : string) : FacetValue {

		public function facetValue(name : string) : FacetValue {

		public function hasFacetValueWithName(name : string) : boolean {

		public function getSelectedFacetValues() : any[] {
		public function updateContentItemFilter() : Filter {
			filter.clear();
			for each(var facetValue:FacetValue in facetValues) {
				if(facetValue.selected){
					filter.add(facetValue);
				}
			}
			return filter;
		}	
	}