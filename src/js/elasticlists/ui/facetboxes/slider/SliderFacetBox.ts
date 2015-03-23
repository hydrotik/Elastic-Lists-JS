module eu.stefaner.elasticlists.ui.facetboxes.slider {
	import Facet = eu.stefaner.elasticlists.data.Facet;
	import FacetBox = eu.stefaner.elasticlists.ui.facetboxes.FacetBox;
	import FacetBoxElement = eu.stefaner.elasticlists.ui.facetboxes.FacetBoxElement;

	import HRangeSlider = com.bit101.components.HRangeSlider;
	import RangeSlider = com.bit101.components.RangeSlider;

	import Logger = org.osflash.thunderbolt.Logger;

	import Event = flash.events.Event;

	/**
	 * @author mo
	 */
	export class SliderFacetBox extends FacetBox {

		private slider : HRangeSlider;

		constructor() {
			super();
		}

		/*override*/ protected initGraphics() : void {
			super.initGraphics();
			this.slider = new HRangeSlider(this, 0, 0);
			this.slider.addEventListener(RangeSlider.DRAG_END, this.onSliderChange);
			this.slider.labelMode = RangeSlider.NEVER;
			this.slider.tick = .01;
			this.slider.minimum = 0;
			this.slider.maximum = this.width;
			this.bg.alpha = 0;
		}

		private onSliderChange(e : Event) : void {
			Logger.info("slider change", this.slider.lowValue, this.slider.highValue);
			this.updateFilterFromSliderPosition();
			this.dispatchEvent(new Event(FacetBox.SELECTION_CHANGE));
		}

		private updateFilterFromSliderPosition() : void {
			if(this.slider.lowValue < this.facetBoxElements[1].x && this.slider.highValue > this.facetBoxElements[this.facetBoxElements.length - 1].x) {
				for each (var sprite:FacetBoxElement in this.facetBoxElements) {
					sprite.facetValue.selected = false;	
				}	
			} else {
				for each (var sprite:FacetBoxElement in this.facetBoxElements) {
					if(sprite.x < this.slider.lowValue || sprite.x >= this.slider.highValue) {
						sprite.facetValue.selected = false;
					} else {
						sprite.facetValue.selected = true;
					}
				}
			}
		}

		private updateSliderPositionFromFilter() : void {
			var lowEndTargetPos : number = -1;
			var highEndTargetPos : number = -1;
			for each (var sprite:FacetBoxElement in this.facetBoxElements) {
				if(sprite.facetValue.selected && lowEndTargetPos == -1) {
					lowEndTargetPos = this.transitioner.$(sprite).x;
				}
				
				if(lowEndTargetPos != -1 && highEndTargetPos == -1 && !sprite.facetValue.selected) {
					highEndTargetPos = this.transitioner.$(sprite).x; 
				}
			}	
			this.transitioner.$(this.slider).lowValue = lowEndTargetPos != -1 ? lowEndTargetPos : 0;
			this.transitioner.$(this.slider).highValue = highEndTargetPos != -1 ? highEndTargetPos : this.slider.maximum;
		}

		//---------------------------------------
		// GETTER / SETTERS
		//---------------------------------------
		/*override*/ protected layout() : void {
			super.layout();
			this.slider.width = this.width;
			this.slider.y = this.height - this.slider.height;
			this.slider.maximum = this.width;
			this.doPositioning();
		}

		/*override*/ protected getNewFacetBoxElement() : FacetBoxElement {
			return new SliderFacetBoxElement();
		}/*;*/

		/*override*/ protected doPositioning() : void {
			var xx : number = 0;
			for each (var sprite:SliderFacetBoxElement in this.facetBoxElements) {
				sprite.height = this.height - this.slider.height;
				sprite.width = this.width / this.facetBoxElements.length;
				this.transitioner.$(sprite).x = xx;
				xx += sprite.width;
			}
			this.updateSliderPositionFromFilter();
		}

		/*override*/ public set facet(facet : Facet) {
			super.facet = facet;
			facet.filter.conjunctive = false;
		}
	}
}
