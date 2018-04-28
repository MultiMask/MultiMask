import { getPass, setPass } from './getter';
import { hash } from './../libs/cipher';

const salt = 'multimask';
const withSalt = pass => `${salt}${pass}`;

export default {
  accounts: [],

  init() {
    getPass().then(passHash => {
      this.passHash = passHash;
    });
  },

  isAuth() {
    console.log('saved pass', this.password)
    return !!this.password;
  },

  login(pass) {
    const isAuth = withSalt(pass) === this.passHash;

    if (isAuth) {
      this.password = pass;
    }

    return isAuth;
  },

  create(pass) {
    setPass(withSalt(pass));
    this.password = pass;
  },

  getAccounts() {
    return this.accounts;
  }
};
