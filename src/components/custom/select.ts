import { ElementController } from '@open-cells/element-controller';
import { LitElement, PropertyValueMap, html, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';

import styles from './select.scss?inline';
import { SelectOption } from '../../types/select';
import { CHANNELS } from '../../utils/constants';

/**
 * Custom select component
 */
@customElement('custom-select')
export class CustomSelect extends LitElement {
	elementController = new ElementController(this);

	static readonly styles = [unsafeCSS(styles)];

	// Properties

	@property({ type: Array })
	options: SelectOption[] = [];

	@property({ type: String })
	selected: string = '';

	@property({ type: String, attribute: 'empty-option' })
	emptyOption: string = 'chooseOption';

	// Private properties

	@property({ type: Boolean })
	private __show: boolean = false;

	@property({ type: String })
	private __selected: string = '';

	// Getters

	/**
	 * Selected value option
	 */
	get selectedValue() {
		return this.__selected ? this.options.find((option) => this.__selected === option.value)?.text : this.emptyOption;
	}

	/**
	 * Dynamic CSS classes for select
	 */
	get classes() {
		return {
			'select-wrapper': true,
			closed: !this.__show,
		};
	}

	/**
	 * WC Lifecycle method
	 */
	connectedCallback(): void {
		super.connectedCallback();
		this.__registerEvents();
	}

	disconnectedCallback(): void {
		super.disconnectedCallback();
		this.__unregisterEvents();
	}

	/**
	 * Lit lifecycle method
	 */
	updated(changedProps: PropertyValueMap<any> | Map<PropertyKey, unknown>) {
		super.updated(changedProps);
		if (changedProps.has('selected') && !this.__selected) {
			this.__selected = this.selected;
		}
	}
	// Methods
	/**
	 * Register events
	 */
	private __registerEvents() {
		this.elementController.subscribe(CHANNELS.VIEWPORT_CLICK, () => {
			this.__show = false;
		});
	}

	/**
	 * Unregister events
	 */
	private __unregisterEvents() {
		this.elementController.unsubscribe(CHANNELS.VIEWPORT_CLICK);
	}

	/**
	 * Toggle show
	 */
	toggleShow(e: MouseEvent | TouchEvent) {
		e.stopPropagation();
		e.preventDefault();

		this.__show = !this.__show;
	}

	/**
	 * Select option
	 * @param {MouseEvent|TouchEvent} e Event
	 */
	selectOption(e: MouseEvent | TouchEvent) {
		e.stopPropagation();
		e.preventDefault();

		const target = e.target as HTMLUListElement;

		this.__selected = target.dataset.value as string;
		this.__show = false;

		const changeEvent = new CustomEvent('change', {
			detail: this.__selected,
			bubbles: true,
			composed: true,
		});
		this.dispatchEvent(changeEvent);
	}

	/**
	 * Render
	 * @returns {TemplateResult}
	 */
	render() {
		return html`
			<div class=${classMap(this.classes)}>
				<button
					class="select-button"
					role="combobox"
					aria-labelledby="select button"
					aria-haspopup="listbox"
					aria-expanded="false"
					aria-controls="select-dropdown"
					@click=${this.toggleShow}>
					<div class="select-choice">${this.selectedValue}</div>
				</button>
				<ul role="listbox" class="select-dropdown" @click=${this.selectOption}>
					${this.options.map((option) => html` <li role="option" data-value=${option.value}>${option.text}</li> `)}
				</ul>
			</div>
		`;
	}
}
