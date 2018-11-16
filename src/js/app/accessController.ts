import { encode, decode } from 'libs/cipher';
import { StorageService } from 'services/StorageService';

import { MessageController } from 'app/messageController';
import { BusController } from 'app/busController';
import { AUTH_IS_READY, AUTH_CHECK, AUTH_LOGIN, AUTH_LOGOUT, AUTH_INIT } from 'constants/auth';
import { CHECK_IS_READY } from 'constants/appInternal';

interface IAccessControllerProps {
  messageController: MessageController;
  busController: BusController;
}

/**
 * Store password in memory for decode Seed
 */
export class AccessController {
  private inited: boolean = false;
  private password: string;

  private busController: BusController;
  private messageController: MessageController;

  constructor (opts: IAccessControllerProps) {
    this.busController = opts.busController;
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

    /**
     * Check Auth from app
     */
    this.busController.on(CHECK_IS_READY, cb => cb(this.isAuth()));
  }

  /**
   * Create new pass
   * @param pass 
   */
  private create (pass: string) {
    StorageService.Pass.set(pass);
    this.password = pass;
    this.inited = true;
  }

  /**
   * Try login, check pass
   * @param pass 
   */
  private async login (pass: string) {
    const isAuth = await StorageService.Pass.check(pass);

    if (isAuth) {
      this.password = pass;
      this.inited = true;
    }

    return isAuth;
  }

  /**
   * Check hash pass without send password
   * @param hashedPass password hash
   */
  private async check (hashedPass: string) {
    return StorageService.Pass.check(hashedPass);
  }

  /**
   * Logout user from App
   */
  private logout () {
    return delete this.password;
  }

  /**
   * Check that user is authorize
   */
  public isAuth () {
    return !!this.password;
  }

  /**
   * Encode any data with master pass
   * @param data 
   */
  public encode = (data: any): string => {
    return encode(this.password, JSON.stringify(data));
  }

  /**
   * Decode encrypted data
   * @param data 
   */
  public decode = (data: string): any => {
    return JSON.parse(decode(this.password, data));
  }
}
