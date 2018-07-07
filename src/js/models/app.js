import { getPass, setPass, remPass } from './getter';
import { hash } from './../libs/cipher';
import AccountManager from './accountManager';

const salt = 'multimask';
const withSalt = pass => `${salt}${pass}`;

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
    setPass(withSalt(pass));
    this.password = pass;
  },

  login(pass) {
    const isAuth = withSalt(pass) === this.passHash;

    if (isAuth) {
      this.password = pass;
    }

    return isAuth;
  },

  logout() {
    return delete this.password;
  }
};
