import { PageController } from '@open-cells/page-controller';
import { html, LitElement, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { translate as t } from 'lit-i18n';

import styles from './home-page.scss?inline';
import { userSvc } from '../../services/user';
import { CHANNELS, SIZES } from '../../utils/constants';
import '../../components/custom/input';
import '../../components/custom/button';
import '../../components/custom/icon';

export type FormObject = {
	[key: string]: any;
};

@customElement('home-page')
export class HomePage extends LitElement {
	static readonly styles = [unsafeCSS(styles)];

	pageController = new PageController(this);

	@property()
	private __invalid: boolean = false;

	@property()
	private __form: FormObject = { user: '' };

	/**
	 * Do login function
	 */
	async doLogin() {
		try {
			const name = this.__form.user;

			if (name) {
				const user = await userSvc.doLogin({
					name,
				});

				this.pageController.publish(CHANNELS.USER_LOGIN, user);
				this.pageController.navigate('game');
			} else {
				this.__invalid = true;
			}
		} catch (err) {
			// @todo Handle user rejection
		}
	}

	render() {
		return html`
			<header-component></header-component>
			<div class="layout-wrapper">
				<custom-icon icon="brain" size=${SIZES.XL}></custom-icon>
				<h1>${t('game.title')}</h1>
				<custom-input
					type="text"
					name="user"
					?invalid=${this.__invalid}
					@input=${() => {
						this.__invalid = false;
					}}
					@change=${(e: InputEvent) => (this.__form.user = e.detail)}
					validation="required"
					placeholder=${t('fields.user')}></custom-input>
				<custom-button type="submit" @click=${this.doLogin}>${t('home.login')}</custom-button>
			</div>
		`;
	}
}
