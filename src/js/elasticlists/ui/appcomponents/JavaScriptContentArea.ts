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

module eu.stefaner.elasticlists.ui.appcomponents {	import App = eu.stefaner.elasticlists.App;	import ContentArea = eu.stefaner.elasticlists.ui.appcomponents.ContentArea;
	import Logger = org.osflash.thunderbolt.Logger;
	import Event = flash.events.Event;	import ExternalInterface = flash.external.ExternalInterface;
	/**	 * @author mo	 */	export class JavaScriptContentArea extends ContentArea {
		constructor() {			super();		}
		/*override*/ public init(app : App) : void {			this.app = app;			app.addEventListener(App.FILTERS_CHANGED, this.onFilteredContentItemsChanged, false, 0, true);		}
		/*override*/ public onFilteredContentItemsChanged(e : Event) : void {				if(ExternalInterface.available) {				var resultsArray : any[] = this.app.model.filteredContentItems.map(function(a) {					return this.a.rawValues;				});				ExternalInterface.call("onFilteredContentItemsChanged", resultsArray);			} else {				Logger.warn("ExternalInterface not available");			}		};	}}