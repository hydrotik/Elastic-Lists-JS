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

module eu.stefaner.elasticlists.data {		/**	 * 	ContentItem 	 * 	 * 	data object representing a content item / search result etc.	 *	 *	@langversion ActionScript 3.0	 *	@playerversion Flash 9.0	 *	 *	@author moritz@stefaner.eu	 */	import Dictionary = flash.utils.Dictionary;	export class ContentItem extends DataItem {		// stores assigned facet values (FacetValue objects)
		public facetValues:Dictionary;		// stores raw values, unparsed vales and additional info (title, description etc.)		public var rawValues:Object;		// title
		public title:string;		// unique id		public var id:String;		// url		// ?		public var url:String;		//	CONSTRUCTOR:
		constructor(id:string) {			this.id = id;			this.facetValues = new Dictionary(true);			this.rawValues = new Object();					}
		/*override*/ public toString():string {			return "[Object ContentItem title:" + this.title + " id:" + this.id + "]";		}/*;*/		public addRawValue(key:string, v:any):void {			if(this.rawValues[key] == null) {				this.rawValues[key] = v;			} else if(!(this.rawValues[key] instanceof Array)) {				this.rawValues[key] = new Array(this.rawValues[key]);				this.rawValues[key].push(v);			} else {				this.rawValues[key].push(v);			}		}	}}