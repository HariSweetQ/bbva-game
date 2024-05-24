import { fn } from '@wdio/browser-runner';
import { browser, expect } from '@wdio/globals';

import { LEVELS } from '../../../../src/utils/constants.ts';
import { createEl, removeEl } from '../../../utils.js';
import '../../../../src/components/game/grid.ts';

describe('Game Grid', () => {
	let el: any;
	let $el: WebdriverIO.Element;

	const TAG_NAME = 'game-grid';
	const matrix = [2, 1, 9, 3, 4, 7, 8, 5, 6];
	const valid = 4;
	const invalid = 5;

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

	it('should render options when passed', async () => {
		el.options = matrix;
		el.setAttribute('valid', String(valid));

		await el.updateComplete;

		const renderedOptions = await $el.shadow$$('.option');

		expect(renderedOptions.length).toEqual(matrix.length);
	});

	it('should receive success event on right answer', async () => {
		const onSuccess = fn();

		el.options = matrix;
		el.setAttribute('valid', String(valid));
		el.setAttribute('level', LEVELS.HARD.value);
		el.addEventListener('success', onSuccess);
		await el.updateComplete;

		const renderedGrid = await $el.shadow$('.grid');
		const renderedOptions = await renderedGrid.$$('.option');

		// Wait until options aren't visible
		await browser.waitUntil(() => !el.__visibleOptions);

		const validOptionIndex = el.options.findIndex((option) => option === valid);
		const validOption = renderedOptions[validOptionIndex];

		// Browser click instead of driver
		await browser.execute((el) => el.click(), validOption);

		expect(onSuccess).toBeCalledTimes(1);
	});

	it('should receive failure event on wrong answer', async () => {
		const onFailure = fn();

		el.options = matrix;
		el.setAttribute('valid', String(valid));
		el.setAttribute('level', LEVELS.HARD.value);
		el.addEventListener('failure', onFailure);
		await el.updateComplete;

		const renderedGrid = await $el.shadow$('.grid');
		const renderedOptions = await renderedGrid.$$('.option');

		// Wait until options aren't visible
		await browser.waitUntil(() => !el.__visibleOptions);

		const invalidOptionIndex = el.options.findIndex((option) => option === invalid);
		const invalidOption = renderedOptions[invalidOptionIndex];

		// Browser click instead of driver
		await browser.execute((el) => el.click(), invalidOption);

		expect(onFailure).toBeCalledTimes(1);
	});

	it('should hide items on level timer and not allow to interact with options', async () => {
		el.options = matrix;
		el.setAttribute('valid', valid);
		el.setAttribute('level', LEVELS.HARD.value);

		await el.updateComplete;

		const timer = LEVELS.HARD.seconds * 1000;

		const renderedGrid = await $el.shadow$('.grid');
		const renderedOptions = await renderedGrid.$$('.option');

		expect(+(await renderedOptions[0].getText())).toBe(matrix[0]);

		// Browser click instead of driver
		await browser.execute((el) => el.click(), renderedOptions[0]);

		// Wait timer time
		await new Promise((resolve) => setTimeout(() => resolve(true), timer));

		expect(await renderedOptions[0].getText()).toBe('?');
	});
});
