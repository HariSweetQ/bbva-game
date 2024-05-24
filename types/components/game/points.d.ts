import { ElementController } from '@open-cells/element-controller';
import { LitElement } from 'lit';
/**
 * Game Points component
 */
export declare class GamePoints extends LitElement {
	elementController: ElementController;
	static readonly styles: import('lit').CSSResult[];
	/**
	 * Total points
	 */
	private __totalPoints;
	/**
	 * WC Lifecycle method
	 */
	connectedCallback(): void;
	/**
	 * WC Lifecycle method
	 */
	disconnectedCallback(): void;
	/**
	 * Render
	 * @returns {TemplateResult}
	 */
	render(): import('lit-html').TemplateResult<1>;
}
