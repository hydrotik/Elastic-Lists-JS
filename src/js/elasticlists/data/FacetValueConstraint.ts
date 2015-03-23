module eu.stefaner.elasticlists.data {

	/**
	 * @author mo
	 */
	export class FacetValueConstraint extends FilterConstraint {

		private facetValue : FacetValue;

		constructor(facetValue:FacetValue) {
			this.facetValue = facetValue;
		}

		/*override*/ public match(c : ContentItem) : boolean {
			return c.facetValues[this.facetValue];
		}
	}
}
