import { LitElement, PropertyValueMap, html, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { translate as t } from 'lit-i18n';

import styles from './grid.scss?inline';
import { gameSvc } from '../../services/game';
import { LEVELS } from '../../utils/constants';

/**
 * Game Grid component
 */
@customElement('game-grid')
export class GameGrid extends LitElement {
	static readonly styles = [unsafeCSS(styles)];

	@property({ type: Number })
	valid: number = 0;

	@property({ type: Number })
	options: number[] = [];

	@property({ type: String })
	level: string = LEVELS.MEDIUM.value;

	@property()
	private __answer: number = 0;

	@property()
	private __visibleOptions: boolean = true;

	@property()
	private __secondsLeft: number = 0;

	/**
	 * CSS class for grid
	 * @returns {Object}
	 */
	get classes() {
		return {
			grid: true,
			restrain: this.__visibleOptions,
		};
	}

	/**
	 * Lit lifecycle method
	 *
	 * @param {PropertyValueMap<any> | Map<PropertyKey, unknown} changedProps
	 */
	updated(changedProps: PropertyValueMap<any> | Map<PropertyKey, unknown>) {
		super.updated(changedProps);

		if (changedProps.has('options') && this.options.length > 0) {
			this.resetGrid();

			const timer = gameSvc.getLevelTimer(this.level);
			this.__secondsLeft = timer / 1000;

			const interval = setInterval(() => {
				this.__secondsLeft--;
			}, 1000);

			setTimeout(() => {
				this.__visibleOptions = false;
				clearInterval(interval);
			}, timer);
		}
	}

	/**
	 * Reset grid
	 */
	resetGrid() {
		this.__visibleOptions = true;
		this.__answer = 0;
	}

	/**
	 * On click handler
	 * @param {MouseEvent|TouchEvent} e Event
	 */
	onClickHandler(e: MouseEvent | TouchEvent) {
		if (!this.__visibleOptions) {
			const target = e.target as HTMLDivElement;
			if (target.classList.contains('option')) {
				const parent = target.parentNode;
				if (parent) {
					const index = Array.from(parent.children).indexOf(target);

					this.__answer = this.options[index];

					const answerEvent = new CustomEvent(this.__answer === this.valid ? 'success' : 'failure');
					this.dispatchEvent(answerEvent);
				}
			}
		}
	}

	/**
	 * CSS class for option
	 * @param option
	 * @returns {Object}
	 */
	optionClasses(option: number) {
		return {
			option: true,
			valid: this.__answer === option && option === this.valid,
			invalid: this.__answer === option && option !== this.valid,
		};
	}

	/**
	 * Render text
	 */
	renderText() {
		let textClass = null;

		let text =
			!this.__answer && this.__visibleOptions
				? t('game.text.instructions', { timer: this.__secondsLeft })
				: t('game.text.guess', { number: this.valid });

		if (this.__answer) {
			textClass = this.__answer === this.valid ? 'valid' : 'invalid';
			text = t(`game.text.${this.__answer === this.valid ? 'success' : 'failure'}`);
		}

		return html`<p class=${textClass}>${text}</p>`;
	}

	/**
	 * Render game grid
	 * @returns {TemplateResult}
	 */
	renderGrid() {
		return html`<div class=${classMap(this.classes)} @click=${this.onClickHandler}>
			${this.options.map(
				(option) =>
					html`<div class=${classMap(this.optionClasses(option))}>
						${this.__visibleOptions || (!this.__visibleOptions && this.__answer === option) ? option : '?'}
					</div>`
			)}
		</div>`;
	}

	/**
	 * Render
	 * @returns {TemplateResult}
	 */
	render() {
		return html`${this.renderText()}${this.renderGrid()}`;
	}
}
