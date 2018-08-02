import { setPass, checkPass } from './getter';
import { hidePass } from '../libs/cipher';

import Interfaces from './interfaces';

export default {
  inited: false,

  init() {
    this.io = Interfaces({ App: this });
    this.inited = true;
    return this.io.auth.init();
  },

  isAuth() {
    return !!this.password;
  },

  create(pass) {
    setPass(hidePass(pass));
    this.password = pass;

    this.init();
  },

  getPass() {
    return this.password;
  },

  async login(pass) {
    const isAuth = await checkPass(hidePass(pass));

    if (isAuth) {
      this.password = pass;

      if (!this.inited) {
        await this.init();
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
