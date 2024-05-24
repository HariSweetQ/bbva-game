import { fn } from '@wdio/browser-runner';
import { expect } from '@wdio/globals';

import { createEl, removeEl } from '../../../utils.js';

import '../../../../src/components/game/header.ts';

describe('Game Header', () => {
	let el: any;
	let $el: WebdriverIO.Element;

	const TAG_NAME = 'game-header';

	const user = {
		name: 'Foo user',
	};

	beforeEach(async () => {
		el = createEl(TAG_NAME, { props: { user } });
		$el = await $(el);
	});

	afterEach(() => {
		removeEl(TAG_NAME);
	});

	it('should render', async () => {
		await expect($el).toBeDisplayedInViewport();
	});

	it('should render user', async () => {
		const renderedUser = await $el.shadow$('.user h4');
		expect(await renderedUser.getText()).toBe(user.name);
	});

	it('should dispatch level change event when level changes', async () => {
		const onLevelChange = fn();
		el.addEventListener('level-change', onLevelChange);

		const renderedLevelSelect = await $el.shadow$('custom-select');
		const renderedLevelSelectButton = await renderedLevelSelect.shadow$('button');
		const renderedLevelSelectOptions = await renderedLevelSelect.shadow$$('li');

		await renderedLevelSelectButton.click();
		await renderedLevelSelectOptions[1].click();

		expect(onLevelChange).toBeCalledTimes(1);
	});
});
