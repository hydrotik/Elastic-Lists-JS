module eu.stefaner.elasticlists.ui.facetboxes.elasticlist {
	import Sprite = flash.display.Sprite;

	/**
	 * @author mo
	 */
	export class BarChartElasticListEntry extends ElasticListEntry {

		private globalBar : Sprite;
		private localBar : Sprite;

		constructor() {
			super();
			this.showTotals = false;
		}

		/*override*/ protected initGraphics() : void {
			super.initGraphics();
			this.globalBar = new Sprite();
			this.globalBar.graphics.beginFill(0xEEEEEE);
			this.globalBar.graphics.drawRect(0, 0, -1, 2);
			this.addChild(this.globalBar);
			
			this.localBar = new Sprite();
			this.localBar.graphics.beginFill(0xDDDDDD);
			this.localBar.graphics.drawRect(0, 0, -1, 6);
			this.addChild(this.localBar);
			this.addChild(this.title_tf);
			this.height = 22;
		}

		/*override*/ protected layout() : void {
			super.layout();
			this.globalBar.x = this.localBar.x = this.width - 50;
			this.localBar.y = 6;
			this.globalBar.y = 13;
		}

		/*override*/ public expand() : void {
			this.localBar.width = this.facetValue.localRatio * 30;
			this.globalBar.width = this.facetValue.globalRatio * 30;
			this.localBar.visible = this.globalBar.visible = true;
			this.mouseEnabled = true;
			this.container.transitioner.$(this).height = 22;
			this.container.transitioner.$(this).alpha = 1;
		}

		/*override*/ public collapse() : void {
			this.mouseEnabled = false;
			this.container.transitioner.$(this).height = this.COLLAPSED_HEIGHT;
			this.container.transitioner.$(this).alpha = .4;
			this.localBar.visible = this.globalBar.visible = false;	
		}
	}
}
