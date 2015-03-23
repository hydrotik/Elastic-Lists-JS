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

package eu.stefaner.elasticlists.ui.facetboxes {
	import flash.display.Sprite;
	public class FacetBoxElement extends InteractiveNodeSprite {
		public var container : FacetBox;			
		public function FacetBoxElement() {
			renderer = null;
		// REVISIT: move params to constructor, move rest with onStageInit?
			initGraphics();
			
			updateStats();
		public function updateStats() : void {
		//---------------------------------------
		override public function onSelectionStatusChange(e : Event = null) : void {
		private function onHighlightStatusChange(event : Event = null) : void {
		//---------------------------------------
		public function expand() : void {
		public function get highlighted() : Boolean {
		public function set highlighted(arg : Boolean) : void {