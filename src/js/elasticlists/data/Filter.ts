module eu.stefaner.elasticlists.data {
	import MapExtent = com.modestmaps.core.MapExtent;

	/**
	 * @author mo
	 */
	export class Filter {

		public values : any[] = [];
		public conjunctive : boolean = this.Model.ANDselectionWithinFacets;

		constructor() {
		}

		public match(c : ContentItem) : boolean {
			if(!this.active) {
				return true;
			}

			for each(var f:FilterConstraint in this.values) {
				if(this.conjunctive) {
					if(!f.match(c)) return false;
				} else if(f.match(c)) {
					return true;
				}
			}

			return this.conjunctive;
		}/*;*/

		public clear() : void {
			this.values = [];
		}

		public add(facetValue : FacetValue) : void {
			this.values.push(new FacetValueConstraint(facetValue));
		}

		public addGeoContraint(facet : GeoFacet, filterExtent : MapExtent) : void {
			this.values.push(new GeoConstraint(facet, filterExtent));
		}

		public get active() : boolean {
			return this.values.length > 0;		}

		public clearGeoContraints() : void {
			for (var i : number = 0;i < this.values.length;i++) {
				if(this.values[i] instanceof this.GeoConstraint) {
					this.values.splice(i, 1);
					i--;
				}
			}
		}
	}
}
