import { StoreInterface } from "../../types/storage";

/**
 * Session store service to interact with sessionStorage
 */
export const sessionStore: StoreInterface = {
  /**
   * Stores an item
   * @param {string} key Key to store
   * @param {any} value Value to store
   * @void
   */
  setValue(key: string, value: undefined) {
    sessionStorage.setItem(key, typeof value !== "string" ? JSON.stringify(value) : value);
  },

  /**
   * Retrieve an item
   * @param {string} key Stored key
   *
   * @returns {undefined}
   */
  getValue(key: string) {
    return sessionStorage.getItem(key);
  },

  /**
   * Remove a key
   * @param {string} key Stored key
   * @void
   */
  remove(key: string) {
    return sessionStorage.removeItem(key);
  },
};
