import { User } from "../types/user.d";
import { ERROR } from "../utils/constants";
import { storageSvc } from "./storage";

/**
 * User service class
 * @class
 */
class UserService {
  /**
   * @prop {User|null} user User instance. Default null
   */
  user: User | null = null;

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
  async doLogin({
    name,
  }: Readonly<{ name: string; password?: string | null }>) {
    const error = new Error(ERROR.USER_LOGIN);

    try {
      const valid: boolean = await this.validateLogin({ name });

      if (valid) {
        return this.user;
      } else {
        throw error;
      }
    } catch (err) {
      throw error;
    }
  }

  /**
   * Validate login
   *
   * @param {Object} params
   * @param {String} params.name User name   
   *
   * @returns {Promise<Boolean>}
   */
  private async validateLogin({
    name    
  }: Readonly<{ name: string }>): Promise<boolean> {
    
    // @todo Implement logic for validation if needed. Then, set user and return status.
    const isValid = true;

    if (isValid)
    {
      this.setUser({
        name,
      });
    }

    return isValid;
  }

  /**
   * Get user
   * @returns {User|null}
   */
  getUser() {    
    if (!this.user) {
      const sessionUser = storageSvc.getValue('user');
      if (sessionUser) {
        this.user = JSON.parse(atob(sessionUser));
      }
    }

    return this.user;
  }

  /**
   * Set user
   * @param user 
   */
  setUser(user:User) {
    this.user = user;
    storageSvc.setValue('user', btoa(JSON.stringify(user)));
  }

  /**
   * Route interceptor
   * 
   * @param {any} navigation Cells navigation
   * @param {any} ctx Cells page context
   * @returns 
   */
  routeInterceptor(navigation:any) {
     let intercept = false;
     let redirect;

    if (!this.user && !storageSvc.getValue('user') && navigation.to.page !== 'home') {
      intercept = true;
      redirect = {page: 'home'};
    }
    return {intercept, redirect}
  }
}

// Singleton
export const userSvc = new UserService();