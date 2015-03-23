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

module eu.stefaner.elasticlists.ui.contentitem {	import InteractiveNodeSprite = eu.stefaner.elasticlists.ui.elements.InteractiveNodeSprite;	import Transitioner = flare.animate.Transitioner;	import Event = flash.events.Event;	import TextFieldAutoSize = flash.text.TextFieldAutoSize;	export class ContentItemSprite extends InteractiveNodeSprite {		public defaultWidth : number;		public defaultHeight : number;		public forRemoval : boolean = false;
		public isVisible : boolean = true;
		constructor(o : Object) {			super(o);		}		/*override*/ protected onStageInit(e : Event) : void {			super.onStageInit(e);			this.label = this.data.title;			if(!this.defaultWidth) this.defaultWidth = this.width;			if(!this.defaultHeight) this.defaultHeight = this.height;			this.title_tf.autoSize = TextFieldAutoSize.NONE;			this.width = 0;			this.height = 0;			this.show();		};		//---------------------------------------		// GETTER / SETTERS		//---------------------------------------		override public function set height( h : Number ) : void { 			selectionMarker.height = bg.height = h;		}		override public function get height() : Number { 			return bg.height; 		}			override public function set width( w : Number ) : void { 			selectionMarker.width = bg.width = w;			title_tf.width = w - title_tf.x;			title_tf.visible = w > 50;		}		override public function get width() : Number { 			return bg.width; 		}		public function updateVisibility(t : Transitioner = null) : Boolean {			t = Transitioner.instance(t);						isVisible = !forRemoval && !data.filteredOut; 						if(!isVisible && visible) {				hide(t);			} else if (isVisible && !visible) {				show(t);			}						return isVisible;		}		public function show(t : Transitioner = null) : void {			t = Transitioner.instance(t);			visible = true;						//t.$(this).alpha = 1;					};		public function hide(t : Transitioner = null) : void {			t = Transitioner.instance(t);			//t.$(this).alpha = 0;			t.$(this).width = 0;			t.$(this).height = 0;			t.$(this).visible = false;										};
		
			}}