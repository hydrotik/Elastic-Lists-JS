module eu.stefaner.elasticlists.ui.facetboxes.slider {
	import DefaultGraphicsFactory = eu.stefaner.elasticlists.ui.DefaultGraphicsFactory;
	import FacetBoxElement = eu.stefaner.elasticlists.ui.facetboxes.FacetBoxElement;

	import Sprite = flash.display.Sprite;

	/**
	 * @author mo
	 */
	export class SliderFacetBoxElement extends FacetBoxElement {

		private localBar : Sprite;
		private globalBar : Sprite;

		constructor() {
			super();
		}

		/*override*/ protected initGraphics() : void {
			if(this.bg == null) {
				this.bg = DefaultGraphicsFactory.getSliderFacetBoxElementBackground();
				this.addChild(this.bg);
			}

			if(this.selectionMarker == null) {
				this.selectionMarker = DefaultGraphicsFactory.getSelectionMarker();
				this.addChild(this.selectionMarker);
			}
			
			if(this.title_tf == null) {
				this.title_tf = DefaultGraphicsFactory.getTextField();
				this.addChild(this.title_tf);
			}
			
			if(this.globalBar == null) {
				this.globalBar = DefaultGraphicsFactory.getSliderFacetBoxElementGlobalBar();
				this.addChild(this.globalBar);
			}
			
			if(this.localBar == null) {
				this.localBar = DefaultGraphicsFactory.getSliderFacetBoxElementLocalBar();
				this.addChild(this.localBar);
			}
			this.bg.alpha = 0;
		}

		protected layout() : void {
			this.title_tf.width = Math.min(this.width, this.title_tf.textWidth + 2);
			this.title_tf.x = this.width * .5 - this.title_tf.width * .5;
			this.title_tf.y = this.height - 16;
			this.localBar.width = this.width * .84;
			this.globalBar.width = this.width * .84;
			this.localBar.x = this.width * .5 - 1;
			this.globalBar.x = this.width * .5 + 1;
			this.localBar.y = this.height - 18;
			this.globalBar.y = this.height - 18;
			//localBar.height = heightForRatio(facetValue.localRatio);
			//globalBar.height = heightForRatio(facetValue.globalRatio);
		}

		/*override*/ public set height( h : number ) {
			this.bg.height = h;
			this.selectionMarker.height = h;
			this.layout();
			this.updateStats();
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

		/*override*/ public updateStats() : void {
			this.container.transitioner.$(this.localBar).height = this.heightForRatio(this.facetValue.localRatio);
			this.container.transitioner.$(this.globalBar).height = this.heightForRatio(this.facetValue.globalRatio) ;
		}

		private heightForRatio(r : number) : number {
			return r * (this.height - 18 - 5);
		}
	}
}
