import config from "../../config";
import { StoreInterface } from "../../types/storage";

/**
 * Cookies store service to handle cookie management
 */
export const cookiesStore:StoreInterface = {
	/**
   * Stores an item
   * @param {string} key Key to store
   * @param {any} value Value to store
   * @param {number} days Expiracy days
   * 
   * @void
   */
	setValue(key:string, value:undefined, days = config.storages.cookies.expireDays) {
		const expirationDate = new Date();
		expirationDate.setTime(
			expirationDate.getTime() + days * 24 * 60 * 60 * 1000,
		);
		const expires = "expires=" + expirationDate.toUTCString();
		document.cookie = `${key}=${value};${expires};path=/`;
	},
	/**
   * Retrieve an item
   * @param {string} key Stored key  
   * 
   * @returns {undefined} 
   */
	getValue(key:string) {
		const cookieName = `${key}=`;
		const cookies = document.cookie.split(";");
		for (const cookie of cookies) {
			let trimmedCookie = cookie.trim();
			if (trimmedCookie.startsWith(cookieName)) {
				return trimmedCookie.substring(cookieName.length);
			}
		}
		return "";
	},
	/**
   * Remove a key
   * @param {string} key Stored key   
   * @void
   */
	remove(key:string) {
		document.cookie = `${key}=;expires=Thu, 01 Jan 1970 00:00:01 GMT;path=/`;
	},
};
