import { getPass, setPass, checkPass } from './getter';
import { hidePass } from './../libs/cipher';
import AccountManager from './accountManager';

export default {
  inited: false,
  accountManager: null,

  init() {
    this.accountManager = new AccountManager({ App: this });
    this.accountManager.restoreWallets();

    this.inited = true;
  },

  isAuth() {
    return !!this.password;
  },

  create(pass) {
    setPass(pass);
    this.password = pass;
  },

  getPass() {
    return this.password;
  },

  async login(pass) {
    const isAuth = await checkPass(hidePass(pass));

    if (isAuth) {
      this.password = pass;

      if (!this.inited) {
        this.init();
      }
    }

    return isAuth;
  },

  async check(hashPass) {
    return await checkPass(hashPass);
  },

  logout() {
    return delete this.password;
  }
};
