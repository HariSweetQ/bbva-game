import { PageController } from '@open-cells/page-controller';
import { html, LitElement, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { translate as t } from 'lit-i18n';

import styles from './game-page.scss?inline';
import { gameSvc } from '../../services/game';
import { userSvc } from '../../services/user';
import { GameParams } from '../../types/game';
import { User } from '../../types/user';
import { CHANNELS } from '../../utils/constants';
import '../../components/game/header';
import '../../components/game/points';
import '../../components/game/grid';
import '../../components/custom/button';

/**
 * Game page
 */
@customElement('game-page')
export class GamePage extends LitElement {
	static readonly styles = [unsafeCSS(styles)];

	pageController = new PageController(this);

	// Properties
	@property()
	protected user: User | null = null;

	// Private properties
	@property()
	private __gameStart: boolean = false;

	@property()
	private __valid: number = 0;

	@property()
	private __options: number[] = [];

	@property()
	private __level: string = gameSvc.defaultLevel;

	@property()
	private __params: GameParams = gameSvc.defaultParams;

	@property()
	private __playAgain: boolean = false;

	/**
	 * WC Lifecycle method
	 */
	connectedCallback(): void {
		super.connectedCallback();
		this.user = userSvc.getUser();
	}

	/**
	 * On start game
	 */
	onStartGame() {
		this.__params = { ...gameSvc.defaultParams };
		this.__playAgain = false;
		this.__gameStart = true;
		this.updateGameParams(this.__params);
		this.updateGridOptions();
	}

	/**
	 * On success handler
	 */
	onSuccessHandler() {
		this.__params.points += gameSvc.getLevelPoints(this.__level);

		this.updateGameParams(this.__params);
		setTimeout(() => {
			this.updateGridOptions();
		}, 5000);
	}

	/**
	 * On failure handler
	 */
	onFailureHandler() {
		this.__playAgain = true;
	}

	/**
	 * On header change habdler
	 */
	onLevelChangeHandler(e: CustomEvent) {
		this.__level = e.detail;
	}

	/**
	 * Update game params
	 * @param params
	 */
	updateGameParams(params: GameParams) {
		this.pageController.publish(CHANNELS.GAME, params);
	}
	/**
	 * Update grid options
	 */
	updateGridOptions() {
		const { valid, options } = gameSvc.getGridData();
		this.__valid = valid;
		this.__options = options;
	}

	/**
	 * Render start screen
	 * @returns {TemplateResult}
	 */
	renderStart() {
		return html` <game-points></game-points>
			${t('game.startInfo')}
			<custom-button id="startGame" @click=${this.onStartGame}>${t('game.start')}</custom-button>`;
	}

	/**
	 * Render game mode
	 * @returns {TemplateResult}
	 */
	renderGame() {
		const playAgain = this.__playAgain
			? html` <div class="layout-footer">
					<custom-button id="playAgain" @click=${this.onStartGame}>${t('game.playAgain')}</custom-button>
				</div>`
			: null;
		return html`<game-points></game-points>
			<game-grid
				valid=${this.__valid}
				level=${this.__level}
				.options=${this.__options}
				@success=${this.onSuccessHandler}
				@failure=${this.onFailureHandler}></game-grid>
			${playAgain}`;
	}

	/**
	 * Render
	 * @returns {TemplateResult}
	 */
	render() {
		return html`<game-header .user=${this.user} @level-change=${this.onLevelChangeHandler}></game-header>
			<div class="layout-wrapper">${this.__gameStart ? this.renderGame() : this.renderStart()}</div>`;
	}
}
