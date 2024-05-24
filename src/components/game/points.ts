import { LitElement, html, unsafeCSS } from "lit";
import { translate as t } from "lit-i18n";
import { customElement, property } from "lit/decorators.js";
import { ElementController } from "@open-cells/element-controller";
import styles from './points.scss?inline';
import { CHANNELS } from "../../utils/constants";
import { GameParams } from "../../types/game";

/**
 * Game Points component
 */
@customElement("game-points")
export class GamePoints extends LitElement {
  elementController = new ElementController(this);

  static readonly styles = [unsafeCSS(styles)];

  @property({ type: Number })
  private __totalPoints: number = 0;

  connectedCallback(): void {
    super.connectedCallback();
    this.elementController.subscribe(CHANNELS.GAME, (params:GameParams) => {
      this.__totalPoints = params.points;
    });
  }

  render() {
    return html`${t("game.total")}: <strong>${this.__totalPoints}</strong>`;
  }
}