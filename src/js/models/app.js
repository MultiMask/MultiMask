import { getPass, setPass, checkPass } from './getter';
import { hidePass } from './../libs/cipher';
import AccountManager from './accountManager';

export default {
  accountManager: null,

  init() {
    this.accountManager = new AccountManager({ App: this });

    getPass().then(passHash => {
      this.passHash = passHash;
    });

    this.accountManager.restoreWallets();
  },

  isAuth() {
    return !!this.password;
  },

  create(pass) {
    setPass(pass);
    this.password = pass;
  },

  async login(pass) {
    const isAuth = await checkPass(hidePass(pass));

    if (isAuth) {
      this.password = pass;
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
