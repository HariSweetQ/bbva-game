import { LitElement, html, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { styleMap } from 'lit/directives/style-map.js';

import styles from './icon.scss?inline';
import { SIZES } from '../../utils/constants';

/**
 * Custom icon component
 */
@customElement('custom-icon')
export class Customicon extends LitElement {
	static readonly styles = [unsafeCSS(styles)];

	@property({ type: String })
	icon: string | null = null;

	@property({ type: String })
	size: string = SIZES.S;

	@property({ type: Boolean })
	invert: boolean = false;

	protected get _icon() {
		return `/assets/icons/${this.icon}.svg`;
	}

	/**
	 * Dynamic CSS classes for select
	 */
	get classes() {
		return {
			[`icon-${this.size}`]: true,
			invert: this.invert,
		};
	}

	render() {
		return html`<i
			class=${classMap(this.classes)}
			style=${styleMap({ 'background-image': `url(${this._icon})` })}></i>`;
	}
}
