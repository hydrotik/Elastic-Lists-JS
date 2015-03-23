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

module eu.stefaner.elasticlists.ui.facetboxes.elasticlist {
	import FacetValue = eu.stefaner.elasticlists.data.FacetValue;
	import DefaultGraphicsFactory = eu.stefaner.elasticlists.ui.DefaultGraphicsFactory;
	import FacetBox = eu.stefaner.elasticlists.ui.facetboxes.FacetBox;
	import FacetBoxElement = eu.stefaner.elasticlists.ui.facetboxes.FacetBoxElement;

	import TextField = flash.text.TextField;
	import TextFieldAutoSize = flash.text.TextFieldAutoSize;
	import TextFormatAlign = flash.text.TextFormatAlign;

	export class ElasticListEntry extends FacetBoxElement {

		//---------------------------------------
		// CLASS CONSTANTS
		//---------------------------------------
		protected static COLLAPSED_HEIGHT : number = 2;
		protected static MIN_HEIGHT : number = 20;
		protected static MAX_HEIGHT : number = 36;
		//---------------------------------------
		// PUBLIC VARIABLES
		//---------------------------------------
		public num_tf : TextField;
		public static showTotals : boolean = true;
		public static SHOW_DISTINCTIVENESS : boolean = true;

		//---------------------------------------
		// CONSTRUCTOR
		//---------------------------------------
		constructor() {
			super();
		}

		/*override*/ public init(c : FacetBox, d : FacetValue) : void {
			//override public function init(c:FacetBox, d:Object):void {
			super.init(c, d);

			//bg.height = height = ElasticListEntry.MAX_HEIGHT;
			this.selectionMarker.y = 1;
		}

		/*override*/ protected initGraphics() : void {
			if(!this.bg) {
				this.bg = DefaultGraphicsFactory.getElasticListEntryBackground();
				this.bg.graphics.lineStyle(0, 0, .2);
				this.bg.graphics.lineTo(this.bg.width, 0);
				this.addChild(this.bg);
			}
			super.initGraphics();
			if(!this.num_tf) {
				this.num_tf = DefaultGraphicsFactory.getTextField();
				this.num_tf.defaultTextFormat.align = TextFormatAlign.RIGHT;
				this.addChild(this.num_tf);
			}
			this.title_tf.autoSize = TextFieldAutoSize.NONE;
			this.title_tf.multiline = false;
			this.num_tf.textColor = 0xAAAAAA;
		}

		//---------------------------------------
		// GETTER / SETTERS
		//---------------------------------------
		protected layout() : void {
			this.title_tf.x = 2;
			this.title_tf.y = 2;
			this.title_tf.height = this.title_tf.textHeight + 5;
			this.num_tf.y = 2;
			this.num_tf.visible = this.title_tf.visible = this.height > 15;
			this.num_tf.x = this.width - this.num_tf.width - 3 - 16;
			this.title_tf.width = this.num_tf.x - this.title_tf.x;
		}

		/*override*/ public set height( h : number ) {
			this.bg.height = h;
			this.selectionMarker.height = h;
			this.layout();
		}

		/*override*/ public get height() : number {
			return this.bg.height;
		}

		/*override*/ public set width( w : number ) {
			this.selectionMarker.width = this.bg.width = w;
			this.layout();
		}

		/*override*/ public get width() : number {
			return this.bg.width;
		}

		//---------------------------------------
		// STATS
		//---------------------------------------
		/*override*/ public updateStats() : void {
			super.updateStats();
			if (ElasticListEntry.showTotals && this.facetValue.totalNumContentItems && this.facetValue.totalNumContentItems != this.facetValue.numContentItems) {
				this.num_tf.text = this.facetValue.numContentItems + "/" + this.facetValue.totalNumContentItems;
			} else {
				this.num_tf.text = String(this.facetValue.numContentItems);
			}
			
			//num_tf.text = Math.round(100 * facetValue.distinctiveness) + "/" + facetValue.numContentItems + "/" + facetValue.totalNumContentItems;
			if(ElasticListEntry.SHOW_DISTINCTIVENESS && !this.selected && this.facetValue.totalNumContentItems != this.facetValue.numContentItems) {
				this.bg.alpha = Math.max(.3, this.facetValue.distinctiveness + .3);
			} else {
				this.bg.alpha = 1;
			}
			
			if (this.facetValue.numContentItems) {
				this.expand();
			} else {
				this.collapse();
			}
		}

		//---------------------------------------
		// DISPLAY STATE
		//---------------------------------------
		/*override*/ public collapse() : void {
			this.container.transitioner.$(this).height = ElasticListEntry.COLLAPSED_HEIGHT;
			this.container.transitioner.$(this).alpha = .4;
			this.mouseEnabled = false;
		}

		/*override*/ public expand() : void {
			var s : number = this.facetValue.numContentItems > 1 ? this.ratioToSize(this.facetValue.localRatio) : ElasticListEntry.MIN_HEIGHT;
			this.container.transitioner.$(this).height = s;
			this.container.transitioner.$(this).alpha = 1;
			this.mouseEnabled = true;
		}

		protected ratioToSize(a : number) : number {
			var result : number;
			if (!a) {
				a = 0;
			}
			var logScale : number = 5;

			result = Math.floor(ElasticListEntry.MAX_HEIGHT * Math.log(1 + a * logScale) / Math.log(logScale + 1));
			result = Math.min(ElasticListEntry.MAX_HEIGHT, Math.max(ElasticListEntry.MIN_HEIGHT, result));
			return result;
		}
	}
}