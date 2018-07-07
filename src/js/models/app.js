import { getPass, setPass, checkPass } from './getter';
import AccountManager from './accountManager';

export default {
  accountManager: null,

  init() {
    this.accountManager = new AccountManager({App: this});

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
    const isAuth = await checkPass(pass);

    if (isAuth) {
      this.password = pass;
    }

    return isAuth;
  },

  logout() {
    return delete this.password;
  }
};
