import { ElementController } from '@open-cells/element-controller';
import { LitElement, html, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { translate as t } from 'lit-i18n';

import styles from './points.scss?inline';
import { GameParams } from '../../types/game';
import { CHANNELS } from '../../utils/constants';

/**
 * Game Points component
 */
@customElement('game-points')
export class GamePoints extends LitElement {
	elementController = new ElementController(this);

	static readonly styles = [unsafeCSS(styles)];

	/**
	 * Total points
	 */
	@property({ type: Number })
	private __totalPoints: number = 0;

	/**
	 * WC Lifecycle method
	 */
	connectedCallback(): void {
		super.connectedCallback();
		this.elementController.subscribe(CHANNELS.GAME, (params: GameParams) => {
			this.__totalPoints = params.points;
		});
	}

	/**
	 * Render
	 * @returns {TemplateResult}
	 */
	render() {
		return html`${t('game.total')}: <strong>${this.__totalPoints}</strong>`;
	}
}
