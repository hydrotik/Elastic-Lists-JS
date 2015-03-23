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

module eu.stefaner.elasticlists.ui {
	import PushButton = com.bit101.components.PushButton;

	import DisplayObjectContainer = flash.display.DisplayObjectContainer;
	import Sprite = flash.display.Sprite;
	import DropShadowFilter = flash.filters.DropShadowFilter;
	import AntiAliasType = flash.text.AntiAliasType;
	import TextField = flash.text.TextField;
	import TextFieldAutoSize = flash.text.TextFieldAutoSize;
	import TextFormat = flash.text.TextFormat;

	export class DefaultGraphicsFactory {

		public static highlightColor : number = 0xEEEE11;

		//[Embed(source="/assets/PTS55F.ttf", fontName="regularFont", advancedAntiAliasing="true", mimeType="application/x-font-truetype")]
		private regularFont : Class;

		//[Embed(source="/assets/Aller_Bd.ttf", fontName="boldFont",  fontWeight='bold',  advancedAntiAliasing="true", mimeType="application/x-font-truetype")]
		private boldFont : Class;
		
		public static regularFontName : string = "regularFont";
		public static boldFontName : string = "boldFont";
		

		public static getTextField() : TextField {
			var t : TextField = new TextField();
			t.autoSize = TextFieldAutoSize.LEFT;
			t.multiline = false;
			t.embedFonts = true;
			t.antiAliasType = AntiAliasType.ADVANCED;
			var tf : TextFormat = new TextFormat(DefaultGraphicsFactory.regularFontName, 10, 0x333333);
			t.defaultTextFormat = tf;
		
			return t;
		}

		public static getFacetBoxContainerBackground() : Sprite {
			var s : Sprite = DefaultGraphicsFactory.getPanelBackground();
			s.filters = [new DropShadowFilter(2, 45, 0, .2)];
			return s;
		}

		public static getFacetBoxBackground() : Sprite {
			var s : Sprite = new Sprite();
			s.graphics.beginFill(0xDDDDDD, 1);
			s.graphics.drawRect(0, 0, 100, 100);
			return s;
		}

		public static getContentItemBackground() : Sprite {
			var s : Sprite = new Sprite();
			s.graphics.beginFill(0xFFFFFF);
			s.graphics.lineStyle(0, 0xCCCCCC, 1);
			s.graphics.drawRect(0, 0, 200, 100);
			//s.filters = [new DropShadowFilter(2, 45, 0, .2)];
			return s;
		}

		public static getSelectionMarker() : Sprite {
			var s : Sprite = new Sprite();
			s.graphics.beginFill(DefaultGraphicsFactory.highlightColor);
			s.graphics.drawRect(0, 0, 100, 100);
			return s;
		}

		public static getTitleTextField() : TextField {
			var t : TextField = new TextField();
			t.autoSize = TextFieldAutoSize.LEFT;
			t.multiline = false;
			t.embedFonts = true;
			t.antiAliasType = AntiAliasType.ADVANCED;
			var tf : TextFormat = new TextFormat(DefaultGraphicsFactory.boldFontName, 12, 0x333333, true);
			t.defaultTextFormat = tf;
			return t;
		}

		public static getPanelBackground() : Sprite {
			var s : Sprite = new Sprite();
			s.graphics.beginFill(0xF0F0F0, 1);
			s.graphics.drawRect(0, 0, 100, 100);
			return s;
		}

		public static getContentAreaBackground() : Sprite {
			var s : Sprite = new Sprite();
			s.graphics.beginFill(0xF0F0F0, 0);
			s.graphics.drawRect(0, 0, 100, 100);
			return s;
		}

		public static getElasticListEntryBackground() : Sprite {
			var s : Sprite = new Sprite();
			s.graphics.beginFill(0xFFFFFF);
			//s.graphics.lineStyle(0, 0xCCCCCC, 1);
			s.graphics.drawRect(0, 0, 200, 100);
			s.filters = [new DropShadowFilter(2, 45, 0, .2)];
			return s;
		}

		public static getButton(p : DisplayObjectContainer, x : number = 0, y : number = 0, label : string = "", handler : Function = null) : PushButton {
			return new PushButton(p, x, y, label, handler);
		}

		public static getMapMarkerBackground() : Sprite {
			var s : Sprite = new Sprite();
			s.graphics.beginFill(0x333333);
			//s.graphics.lineStyle(0, 0xCCCCCC, 1, false, "none");
			//s.filters = [new DropShadowFilter(2, 45, 0, .2)];
			s.graphics.drawCircle(0, 0, 1);
			return s;
		}

		public static getMapMarkerSelectionMarker() : Sprite {
			var s : Sprite = new Sprite();
			s.graphics.beginFill(DefaultGraphicsFactory.highlightColor);
			//s.graphics.lineStyle(0, 0xCCCCCC, 1);
			s.graphics.drawCircle(0, 0, 1);
			return s;
		}

		public static getSliderFacetBoxElementBackground() : Sprite {
			var s : Sprite = new Sprite();
			s.graphics.beginFill(0xFFFFFF);
			//s.graphics.lineStyle(0, 0xCCCCCC, 1);
			s.graphics.drawRect(0, 0, 200, 100);
			return s;
		}

		public static getSliderFacetBoxElementLocalBar() : Sprite {
			var s : Sprite = new Sprite();
			s.graphics.beginFill(0xFFFFFF);
			s.graphics.lineStyle(0, 0xCCCCCC, 1);
			s.graphics.drawRect(-1, -2, 2, 2);
			s.filters = [new DropShadowFilter(0, 45, 0, .2)];
			return s;
		}

		public static getSliderFacetBoxElementGlobalBar() : Sprite {
			var s : Sprite = new Sprite();
			s.graphics.beginFill(0xDDDDDD);
			//s.graphics.lineStyle(0, 0xCCCCCC, 1);
			s.graphics.drawRect(-1, -2, 2, 2);
			return s;
		}
	}
}
