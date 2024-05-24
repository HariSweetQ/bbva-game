import { gameSvc } from "../../services/game";
import { User } from "../../types/user";

import { LitElement, html, unsafeCSS } from "lit";
import { customElement, property } from "lit/decorators.js";
import { translate as t } from "lit-i18n";
import styles from "./header.scss?inline"
import "../custom/select";
import "../custom/icon";

/**
 * Game Header component
 */
@customElement("game-header")
export class GameHeader extends LitElement {
  static readonly styles = [unsafeCSS(styles)]

  @property({ type: Object })
  user: User | null = null;  

  /**
   * On change handler
   */
  onLevelChangeHandler(e: InputEvent) {
    e.stopPropagation();
    e.preventDefault();

    const levelChangeEvent = new CustomEvent("level-change", {
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
        selected=${gameSvc.defaultLevel}
        .options=${gameSvc.levelOptions.map((level) => level)}
        @change=${this.onLevelChangeHandler}
      >
      </custom-select>
    `;
  }

  /**
   * Render profile template
   * @returns {TemplateResult}
   */
  renderProfile() {
    return html`
      <div class="user">
        <custom-icon icon="user" size="l" ?invert=${true}></custom-icon>
        <h4>${this.user?.name}</h4>
      </div>
      <div class="level">${t("game.level")}: ${this.renderLevels()}</div>`;
  }

  render() {
    return html`<nav>${this.renderProfile()}</nav>`;
  }
}