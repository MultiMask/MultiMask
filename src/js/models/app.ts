import { setPass, checkPass } from './getter';
import { hidePass } from '../libs/cipher';

import Interfaces from './interfaces';

export default {
  inited: false,

  bootstrap() {
    this.io = Interfaces({ App: this });
  },

  init() {
    this.inited = true;
    return this.io.auth.init();
  },

  isAuth() {
    return !!this.password;
  },

  isReady() {
    return this.inited;
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
