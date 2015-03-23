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
	import Facet = eu.stefaner.elasticlists.data.Facet;
	import FacetValue = eu.stefaner.elasticlists.data.FacetValue;
	import DefaultGraphicsFactory = eu.stefaner.elasticlists.ui.DefaultGraphicsFactory;

	import Transitioner = flare.animate.Transitioner;

	import Sprite = flash.display.Sprite;
	import Event = flash.events.Event;
	import Dictionary = flash.utils.Dictionary;

	/**
		//---------------------------------------
		private _facet : Facet;

		//---------------------------------------
		}

					f = facetBoxElementForDataObject[facetValue];
		
		public function get facet() : Facet {
			return _facet;
		}
		
		public function set facet(facet : Facet) : void {
			_facet = facet;
		}