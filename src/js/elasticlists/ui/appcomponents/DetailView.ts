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
module eu.stefaner.elasticlists.ui.appcomponents {
	/**	 *	Class description.	 *	 *	@langversion ActionScript 3.0	 *	@playerversion Flash 9.0	 *	 *	@author moritz@stefaner.eu	 *	@since  23.11.2007	 */
	import ContentItem = eu.stefaner.elasticlists.data.ContentItem;
	import DefaultGraphicsFactory = eu.stefaner.elasticlists.ui.DefaultGraphicsFactory;

	import Sprite = flash.display.Sprite;
	import TextField = flash.text.TextField;

	export class DetailView extends Sprite {
		public bg : Sprite;
		public title_tf : TextField;

		constructor() {
			super();
			this.initGraphics();
		}

		private initGraphics() : void {
			if(!this.title_tf) {
				this.title_tf = DefaultGraphicsFactory.getTitleTextField();
				this.addChild(this.title_tf);
			}
		}

		public display(c : ContentItem):void {
			try {
				this.title_tf.text = c.title;
			} catch(error : Error) {
			}
		}
	}
}