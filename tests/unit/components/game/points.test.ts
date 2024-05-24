import { expect } from '@wdio/globals';

import { createEl, removeEl } from '../../../utils.js';
import '../../../../src/components/game/points.ts';

describe('Game Points', () => {
	let el: any;
	let $el: WebdriverIO.Element;

	const TAG_NAME = 'game-points';

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

	it('should update points', async () => {
		let points = 0;

		const totalEl = await $el.shadow$('strong');
		expect(+(await totalEl.getText())).toBe(points);

		points = 20;
		el.__totalPoints = points;
		await el.updateComplete;

		expect(+(await totalEl.getText())).toBe(points);
	});
});
