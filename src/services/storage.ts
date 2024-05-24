
import { StorageService } from "../types/storage.d";
import { cookiesStore } from "./stores/cookies";
import { localStore } from "./stores/local";
import { sessionStore } from "./stores/session";
import config from "../config";

/**
 * Storage service.
 * Common interface to handle different storage methods all in one
 */
export const storageSvc: StorageService = {
	default: config.storages.default,

	storages: {
		session: sessionStore,
		local: localStore,
		cookies: cookiesStore,
	},

	/**
   * Stores an item based on selected storage
   * @param {string} key Key to store
   * @param {any} value Value to store
   * @param {string} storage Storage type
   * @void
   */
	setValue(key:string, value:undefined, storage:string = storageSvc.default) {
    storageSvc.storages[storage].setValue(key, value);
	},

	/**
   * Retrieves an item based on selected storage
   * @param {string} key Stored key
   * @param {import("../utils/constants").Storages} storage Storage type
   * 
   * @returns {undefined}
   */
	getValue(key:string, storage:string = storageSvc.default) {
		return storageSvc.storages[storage].getValue(key);
	},

	/**
   * Remove key from storage
   * @param {string} key Stored key
   * @param {import("../utils/constants").Storages} storage  Storage Type
   * @returns {boolean}
   */
	remove(key:string, storage:string = storageSvc.default) {
		return storageSvc.storages[storage].remove(key);
	},
};
