import { PageController } from '@open-cells/page-controller';
import { LitElement } from 'lit';

import { GameParams } from '../../types/game';
import { User } from '../../types/user';
import '../../components/game/header';
import '../../components/game/points';
import '../../components/game/grid';
import '../../components/custom/button';
/**
 * Game page
 */
export declare class GamePage extends LitElement {
	static readonly styles: import('lit').CSSResult[];
	pageController: PageController;
	protected user: User | null;
	private __gameStart;
	private __valid;
	private __options;
	private __level;
	private __params;
	private __playAgain;
	/**
	 * WC Lifecycle method
	 */
	connectedCallback(): void;
	/**
	 * On start game
	 */
	onStartGame(): void;
	/**
	 * On success handler
	 */
	onSuccessHandler(): void;
	/**
	 * On failure handler
	 */
	onFailureHandler(): void;
	/**
	 * On header change habdler
	 */
	onLevelChangeHandler(e: CustomEvent): void;
	/**
	 * Update game params
	 * @param params
	 */
	updateGameParams(params: GameParams): void;
	/**
	 * Update grid options
	 */
	updateGridOptions(): void;
	/**
	 * Render start screen
	 * @returns {TemplateResult}
	 */
	renderStart(): import('lit-html').TemplateResult<1>;
	/**
	 * Render game mode
	 * @returns {TemplateResult}
	 */
	renderGame(): import('lit-html').TemplateResult<1>;
	/**
	 * Render
	 * @returns {TemplateResult}
	 */
	render(): import('lit-html').TemplateResult<1>;
}
