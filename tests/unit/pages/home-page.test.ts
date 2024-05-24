import { expect } from '@wdio/globals';

import { createEl, removeEl } from '../../utils.js';
import '../../../src/pages/home/home-page.ts';

describe('Home Page', () => {
	let el: any;
	let $el: WebdriverIO.Element;

	const TAG_NAME = 'home-page';

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

	/**
	 * @todo Do control access validation. Not enough time to cover all components in this demo.
	 */
});
