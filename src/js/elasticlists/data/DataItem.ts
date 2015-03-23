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

module eu.stefaner.elasticlists.data {		/**	 * 	DataItem 	 * 	 * 	base class for ContentItem and FacetValue	 * 	stores and dispatches selection and filtering state	 *	 *	@langversion ActionScript 3.0	 *	@playerversion Flash 9.0	 *	 *	@author moritz@stefaner.eu	 */	import Event = flash.events.Event;	import EventDispatcher = flash.events.EventDispatcher;	export class DataItem extends EventDispatcher {		protected _selected : boolean = false;		protected _highlighted : boolean = false;		protected _filteredOut : boolean = false;		public props : Object = {};		// events		public static var SELECTION_STATUS_CHANGE : String = "SELECTION_STATUS_CHANGE";		public static const HIGHLIGHT_STATUS_CHANGE : String = "HIGHLIGHT_STATUS_CHANGE";
		constructor(o : Object = null) {			super();			if(o != null) {				this.props = o;			}		}
		public get selected() : boolean { 			return this._selected; 		}
		public set selected( arg : boolean ) { 			if(arg == this._selected) {				return;			}			this._selected = arg; 			this.dispatchEvent(new Event(DataItem.SELECTION_STATUS_CHANGE));		}
		public toggleSelected() : void { 			this.selected = !this.selected;		}
		public get filteredOut() : boolean { 			return this._filteredOut; 		}
		public set filteredOut( arg : boolean ) { 			this._filteredOut = arg; 		}		public get highlighted() : boolean {			return this._highlighted;		}		public set highlighted(arg : boolean) {			if(arg == this._highlighted) {				return;			}			this._highlighted = arg; 			this.dispatchEvent(new Event(DataItem.HIGHLIGHT_STATUS_CHANGE));		}	}}