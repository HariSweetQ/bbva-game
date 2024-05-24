import { User } from '../types/user.d';
/**
 * User service class
 * @class
 */
declare class UserService {
	/**
	 * @prop {User|null} user User instance. Default null
	 */
	user: User | null;
	/**
	 * Do login function
	 * @param {Object} params
	 * @param {String} params.name User name
	 *
	 * @returns {User} User logged instance
	 * @throws {Error} Throws error on fail
	 *
	 * @method
	 * @public
	 */
	doLogin({
		name,
	}: Readonly<{
		name: string;
		password?: string | null;
	}>): Promise<User | null>;
	/**
	 * Validate login
	 *
	 * @param {Object} params
	 * @param {String} params.name User name
	 *
	 * @returns {Promise<Boolean>}
	 */
	private validateLogin;
	/**
	 * Get user
	 * @returns {User|null}
	 */
	getUser(): User | null;
	/**
	 * Set user
	 * @param user
	 */
	setUser(user: User): void;
	/**
	 * Route interceptor
	 *
	 * @param {any} navigation Cells navigation
	 * @param {any} ctx Cells page context
	 * @returns
	 */
	routeInterceptor(navigation: any): {
		intercept: boolean;
		redirect: { page: string } | undefined;
	};
}
export declare const userSvc: UserService;
export {};
