import { ElementController } from '@open-cells/element-controller';
import { LitElement, html, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { translate as t } from 'lit-i18n';

import styles from './header.scss?inline';
import { gameSvc } from '../../services/game';
import { GameParams } from '../../types/game';
import { User } from '../../types/user';
import { CHANNELS } from '../../utils/constants';
import '../custom/select';
import '../custom/icon';

/**
 * Game Header component
 */
@customElement('game-header')
export class GameHeader extends LitElement {
	elementController = new ElementController(this);

	static readonly styles = [unsafeCSS(styles)];

	@property({ type: Object })
	user: User | null = null;

	@property()
	private __isPlaying: boolean = false;

	/**
	 * WC Lifecycle method
	 */
	connectedCallback(): void {
		super.connectedCallback();
		this.elementController.subscribe(CHANNELS.GAME, (params: GameParams) => {
			this.__isPlaying = params.isPlaying;
		});
	}

	/**
	 * WC Lifecycle method
	 */
	disconnectedCallback(): void {
		super.disconnectedCallback();
		this.elementController.unsubscribe(CHANNELS.GAME);
	}

	/**
	 * On change handler
	 */
	onLevelChangeHandler(e: InputEvent) {
		e.stopPropagation();
		e.preventDefault();

		const levelChangeEvent = new CustomEvent('level-change', {
			detail: e.detail,
		});

		this.dispatchEvent(levelChangeEvent);
	}

	/**
	 * Render level template
	 * @returns {TemplateResult}
	 */
	renderLevels() {
		return html`
			<custom-select
				empty-option="game.chooseLevel"
				?disabled=${this.__isPlaying}
				selected=${gameSvc.defaultLevel}
				.options=${gameSvc.levelOptions.map((level) => level)}
				@change=${this.onLevelChangeHandler}>
			</custom-select>
		`;
	}

	/**
	 * Render profile template
	 * @returns {TemplateResult}
	 */
	renderProfile() {
		return html` <div class="user">
				<custom-icon icon="user" size="l" ?invert=${true}></custom-icon>
				<h4>${this.user?.name}</h4>
			</div>
			<div class="level">${t('game.level')}: ${this.renderLevels()}</div>`;
	}

	render() {
		return html`<nav>${this.renderProfile()}</nav>`;
	}
}
