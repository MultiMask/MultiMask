import { getPass, setPass } from './getter';
import { hash } from './../libs/cipher';

const salt = 'multimask';
const withSalt = pass => `${salt}${pass}`;

export default {
  init() {
    getPass().then(passHash => this.passHash);
  },

  isAuth() {
    return !!this.password;
  },

  auth(pass) {
    const isAuth = hash(withSalt(pass)) === this.passHash;

    if (isAuth) {
      this.password = pass;
    }

    return isAuth;
  },

  login(pass) {
    setPass(withSalt(pass));
    this.password = pass;
  }
};
