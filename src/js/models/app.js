import { getPass, setPass, getAccountList, setAccountList } from './getter';
import { hash } from './../libs/cipher';
import AccountFactory from './accountFactory';

const salt = 'multimask';
const withSalt = pass => `${salt}${pass}`;

export default {
  accounts: [],

  init() {
    getPass().then(passHash => {
      this.passHash = passHash;
    });

    getAccountList().then(accounts => {
      console.log(accounts);
    });
  },

  isAuth() {
    // console.log('saved pass', this.password)
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
  },

  addAccount(account) {
    const fullAccount = AccountFactory.restore(account);

    this.accounts.push(fullAccount);
    this.save();
  },

  save() {
    let accs = this.accounts.map(acc => acc.name);

    console.log(accs);
  }
};
