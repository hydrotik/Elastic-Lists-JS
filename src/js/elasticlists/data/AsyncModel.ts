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

module eu.stefaner.elasticlists.data {		/**	 * 	AsyncModel 	 * 	 *	replaces the full-fledged model in situations where the server does all the calculation	 *	then, the app's dataConnector takes care of assigning totalNumContentItems and 	 *	numContentItems values to facetValues	 *	 *	@langversion ActionScript 3.0	 *	@playerversion Flash 9.0	 *	 *	@author moritz@stefaner.eu	 */	import App = eu.stefaner.elasticlists.App;	import Model = eu.stefaner.elasticlists.data.Model;	import Dictionary = flash.utils.Dictionary;	export class AsyncModel extends Model {		constructor(a:App) {			super(a);		}		/*override*/ public getTotalNumContentItemsForFacetValue(f:FacetValue):number {			return f.totalNumContentItems;		}		/*override*/ public getFilteredNumContentItemsForFacetValue(f:FacetValue):number {			return f.numContentItems;		}		public clearContentItems():void {			this.facetValuesForContentItem = new Dictionary(true);			this.allContentItems = [];			this.allContentItemsForFacetValue = new Dictionary(true);			this.contentItemsById = new Dictionary(true);			this.filteredContentItems = [];			}	}}