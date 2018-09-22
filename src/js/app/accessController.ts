import { setPass, checkPass } from 'services/getter';
import { hidePass } from 'libs/cipher';

import { MessageController } from './messageController';

import { AUTH_IS_READY, AUTH_CHECK, AUTH_LOGIN, AUTH_LOGOUT, AUTH_INIT } from 'constants/auth';

interface AccessControllerProps {
  messageController: MessageController
}

/**
 * Store password in memory for decode Seed
 */
export class AccessController {
  private inited: boolean = false;
  private password: string;

  private messageController: MessageController;

  constructor (opts: AccessControllerProps) {
    this.messageController = opts.messageController;

    this.startListening();
  }

  /** 
   * Listen message
   */
  private startListening () {
    // TODO: Maybe use AUTH_CHECK for this purpuse
    this.messageController.on(AUTH_IS_READY, (sendResponse) => {
      sendResponse({
        isReady: this.isAuth()
      });
    })

    /**
     * Check authorize user
     */
    this.messageController.on(AUTH_CHECK, (sendResponse) => {
      sendResponse({
        isAuth: this.isAuth()
      });
    })

    /**
     * Create new Password for new User
     */
    this.messageController.on(AUTH_INIT, (sendResponse, { pass }) => {
      this.create(pass);
      sendResponse({ result: true });
    })

    /**
     * Try login
     */
    this.messageController.on(AUTH_LOGIN, (sendResponse, { pass }) => {
      this.login(pass).then(isLogin => {
        sendResponse({ isLogin });
      })
    })

    /**
     * Try logout
     */
    this.messageController.on(AUTH_LOGOUT, (sendResponse) => {
      sendResponse({ isLogout: this.logout() });
    })
  }

  /**
   * Return pass for decode and encode profiles and wallets
   */
  public getPass () {
    return this.password;
  }

  /**
   * Check that user is authorize
   */
  public isAuth () {
    return !!this.password;
  }

  /**
   * Create new pass
   * @param pass 
   */
  private create (pass: string) {
    setPass(hidePass(pass));
    this.password = pass;
    this.inited = true;
  }

  /**
   * Try login, check pass
   * @param pass 
   */
  private async login (pass: string) {
    const isAuth = await checkPass(hidePass(pass));

    if (isAuth) {
      this.password = pass;
      this.inited = true;
    }

    return isAuth;
  }

  /**
   * Check hash pass without send password
   * @param hashPass password hash
   */
  private async check (hashPass: string) {
    return checkPass(hashPass);
  }

  /**
   * Logout user from App
   */
  private logout () {
    return delete this.password;
  }
}
