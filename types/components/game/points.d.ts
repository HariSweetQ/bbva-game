import { ElementController } from '@open-cells/element-controller';
import { LitElement } from 'lit';
/**
 * Game Points component
 */
export declare class GamePoints extends LitElement {
	elementController: ElementController;
	static readonly styles: import('lit').CSSResult[];
	private __totalPoints;
	connectedCallback(): void;
	render(): import('lit-html').TemplateResult<1>;
}
