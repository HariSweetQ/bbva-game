import { ElementController } from '@open-cells/element-controller';
import { LitElement } from 'lit';

import { User } from '../../types/user';
import '../custom/select';
import '../custom/icon';
/**
 * Game Header component
 */
export declare class GameHeader extends LitElement {
	elementController: ElementController;
	static readonly styles: import('lit').CSSResult[];
	user: User | null;
	private __isPlaying;
	/**
	 * WC Lifecycle method
	 */
	connectedCallback(): void;
	/**
	 * WC Lifecycle method
	 */
	disconnectedCallback(): void;
	/**
	 * On change handler
	 */
	onLevelChangeHandler(e: InputEvent): void;
	/**
	 * Render level template
	 * @returns {TemplateResult}
	 */
	renderLevels(): import('lit-html').TemplateResult<1>;
	/**
	 * Render profile template
	 * @returns {TemplateResult}
	 */
	renderProfile(): import('lit-html').TemplateResult<1>;
	render(): import('lit-html').TemplateResult<1>;
}
