import { getPass, setPass } from './getter';
import { hash } from './../libs/cipher';

const salt = 'multimask';
const withSalt = pass => `${pass}${salt}`;

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
    console.log(pass);
    console.log(withSalt(pass));
    console.log(hash(withSalt(pass)));
    // setPass(withSalt(pass));
    // this.password = psss;
  }
};
