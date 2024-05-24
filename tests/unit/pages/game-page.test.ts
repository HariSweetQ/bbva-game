import { expect } from '@wdio/globals';

import { createEl, removeEl } from '../../utils.js';
import '../../../src/pages/game/game-page.ts';

describe('Game Page', () => {
	let el: any;
	let $el: WebdriverIO.Element;

	const TAG_NAME = 'game-page';

	beforeEach(async () => {
		el = createEl(TAG_NAME);
		$el = await $(el);
	});

	afterEach(() => {
		removeEl(TAG_NAME);
	});

	it('should render', async () => {
		await expect($el).toBeDisplayedInViewport();
	});

	it('should render start screen in the beginning', async () => {
		const renderedLayout = await $el.shadow$('.layout-wrapper');
		expect(await renderedLayout.$('game-points')).toBeDisplayedInViewport();
		expect(await renderedLayout.$('#startGame')).toBeDisplayedInViewport();
	});

	it('should render game screen when game starts', async () => {
		el.__gameStart = true;
		await el.updateComplete;

		const renderedLayout = await $el.shadow$('.layout-wrapper');
		expect(await renderedLayout.$('game-points')).toBeDisplayedInViewport();
		expect(await renderedLayout.$('game-grid')).toBeDisplayedInViewport();
	});

	it('should render play again when game ends', async () => {
		el.__gameStart = true;
		await el.updateComplete;

		const renderedLayout = await $el.shadow$('.layout-wrapper');
		expect(await renderedLayout.$('layout-footer')).not.toExist;

		el.__playAgain = true;
		expect(await renderedLayout.$('layout-footer')).toBeDisplayedInViewport;
	});
});
