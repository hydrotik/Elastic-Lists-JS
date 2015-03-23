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

module eu.stefaner.elasticlists.ui.elements {		import DataItem = eu.stefaner.elasticlists.data.DataItem;	import DefaultGraphicsFactory = eu.stefaner.elasticlists.ui.DefaultGraphicsFactory;

	import NodeSprite = flare.vis.data.NodeSprite;

	import Sprite = flash.display.Sprite;	import Event = flash.events.Event;	import MouseEvent = flash.events.MouseEvent;	import TextField = flash.text.TextField;

	/**	 *	Base class for ContentItemSprites, FacetBoxElements	 *	provides click handler, selection state etc.	 *	 *	@langversion ActionScript 3.0	 *	@playerversion Flash 9.0	 *	 *	@author moritz@stefaner.eu	 *	@since  23.11.2007	 */	export class InteractiveNodeSprite extends NodeSprite {

		private _label : string;		private _selected : boolean = false;		public filteredOut : boolean = false;		public bg : Sprite;		public title_tf : TextField;		public selectionMarker : Sprite;

		constructor(o : Object = null) {
			super();
						if(o != null) {				this.data = o;			}						this.addEventListener(Event.ADDED_TO_STAGE, this.onStageInit);		}

		protected onStageInit(event : Event) : void {			this.initGraphics();
			this.renderer = null;
			
			this.buttonMode = true;			this.mouseChildren = false;						this.addEventListener(MouseEvent.CLICK, this.onClick);						this.addEventListener(MouseEvent.ROLL_OVER, this.onRollOver);			this.addEventListener(MouseEvent.ROLL_OUT, this.onRollOut);						this.onSelectionStatusChange();		}

		protected initGraphics() : void {			if(this.bg == null) {				this.bg = DefaultGraphicsFactory.getContentItemBackground();				this.addChild(this.bg);			}			if(this.selectionMarker == null) {				this.selectionMarker = DefaultGraphicsFactory.getSelectionMarker();				this.addChild(this.selectionMarker);			}						if(this.title_tf == null) {				this.title_tf = DefaultGraphicsFactory.getTextField();				this.addChild(this.title_tf);			}		}

		//--------------------------------------		//  CLASS METHODS		//--------------------------------------					// REVISIT: needed?		public static function getVisibility(n : InteractiveNodeSprite) : Boolean {			return !n.data.filteredOut;		};

		//--------------------------------------		//  GETTER/SETTERS		//--------------------------------------				/** Object storing backing data values. */		override public function get data() : Object { 			return DataItem(_data); 		}

		/*override*/ public set data(d : Object) {			if(!d instanceof DataItem) {				throw new Error("InteractiveNodeSprite needs a DataItem as data");			} 			this._data = DataItem(d); 			this._data.addEventListener(DataItem.SELECTION_STATUS_CHANGE, this.onSelectionStatusChange, false, 0, true);						this.onSelectionStatusChange();		}

		// label				public function set label( arg : String ) : void { 			_label = arg;			if(title_tf) {				title_tf.text = arg ? arg : "";			}		}

		public get label() : string { 			return this._label; 		}

		// height				override public function set height( h : Number ) : void { 			bg.height = selectionMarker.height = h;					}

		/*override*/ public get height() : number { 			return this.bg.height; 		}	

		// width		override public function set width( w : Number ) : void { 			bg.width = selectionMarker.width = w;		}

		/*override*/ public get width() : number { 			return this.bg.width; 		}

		// selected		public function set selected( arg : Boolean ) : void { 			_selected = arg;			if(selectionMarker) {				selectionMarker.visible = arg;				selectionMarker.alpha = 1;			}		}

		public get selected() : boolean { 			return this._selected; 		}

		public onSelectionStatusChange(e : Event = null) : void {			this.selected = this.data.selected;		}/*;*/

		// MOUSE EVENTS		protected function onRollOver(e : MouseEvent) : void {			selectionMarker.visible = true;			selectionMarker.alpha = .5;		};

		protected onRollOut(e : MouseEvent) : void {			if(this.selected) {				this.selectionMarker.visible = true;				this.selectionMarker.alpha = 1;			} else {				this.selectionMarker.visible = false;				this.selectionMarker.alpha = .5;			}				}/*;*/

		protected onClick(e : MouseEvent) : void {			this.data.toggleSelected();		};	}}