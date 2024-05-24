import { startApp } from '@open-cells/core';
import { LitElement, html, unsafeCSS } from 'lit';
import { customElement } from 'lit/decorators.js';
import { ElementController } from '@open-cells/element-controller';
import { routes } from '../router/routes.js';
import { userSvc } from '../services/user';
import { CHANNELS } from '../utils/constants.js';
import fontStyles from '../css/_fonts.scss?inline'
import styles from "./app-index.scss?inline";
import '../utils/i18n';

startApp({
  routes,
  binding: "always",
  mainNode: "app__content",
  interceptor: userSvc.routeInterceptor
});

@customElement("app-index")
export class AppIndex extends LitElement {
  elementController = new ElementController(this);

  static readonly styles = [unsafeCSS(styles), unsafeCSS(fontStyles)];


  onClickHandler(e:MouseEvent|TouchEvent) {    
    this.elementController.publish(CHANNELS.VIEWPORT_CLICK, e.target)
  }

  render() {
    return html`
      <main role="main" tabindex="-1" @click=${this.onClickHandler}>
        <slot></slot>
      </main>
    `;
  }
}
