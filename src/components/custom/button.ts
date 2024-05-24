import { LitElement, html, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';

import styles from './button.scss?inline';

/**
 * Custom button component
 */
@customElement('custom-button')
export class CustomButton extends LitElement {
	static readonly styles = [unsafeCSS(styles)];

	@property({ type: String })
	type: string = 'button';

	@property({ type: String })
	variant: string = 'primary';

	/**
	 * Dynamic CSS classes for select
	 */
	get classes() {
		return {
			[this.variant]: true,
		};
	}

	render() {
		return html`<button class=${classMap(this.classes)} type=${this.type}>
			<slot></slot>
		</button>`;
	}
}
