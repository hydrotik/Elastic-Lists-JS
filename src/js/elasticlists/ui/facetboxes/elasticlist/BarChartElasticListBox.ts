module eu.stefaner.elasticlists.ui.facetboxes.elasticlist {
	import FacetBoxElement = eu.stefaner.elasticlists.ui.facetboxes.FacetBoxElement;

	/**
	 * @author mo
	 */
	export class BarChartElasticListBox extends ElasticListBox {

		/*override*/ protected getNewFacetBoxElement() : FacetBoxElement {
			return new BarChartElasticListEntry();
		};
		
	}
}
