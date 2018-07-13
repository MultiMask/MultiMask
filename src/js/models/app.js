import { setPass, checkPass } from './getter';
import { hidePass } from '../libs/cipher';

import Interfaces from './interfaces';

export default {
  inited: false,
  accountManager: null,
  profileManager: null,

  init() {
    this.io = Interfaces({ App: this });
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
