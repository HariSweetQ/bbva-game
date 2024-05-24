import { StoreInterface } from '../../types/storage';
/**
 * Local store service to interact with localStorage
 */
export const localStore: StoreInterface = {
	/**
	 * Stores an item
	 * @param {string} key Key to store
	 * @param {any} value Value to store
	 * @void
	 */
	setValue(key: string, value: undefined) {
		localStorage.setItem(key, JSON.stringify(value));
	},

	/**
	 * Retrieve an item
	 * @param {string} key Stored key
	 *
	 * @returns {undefined}
	 */
	getValue(key: string) {
		return localStorage.getItem(key);
	},

	/**
	 * Remove a key
	 * @param {string} key Stored key
	 * @void
	 */
	remove(key: string) {
		localStorage.removeItem(key);
	},
};
