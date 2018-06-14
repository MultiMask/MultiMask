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

    getAccountList().then(this.restore.bind(this));
  },

  restore(accs) {
    console.log('load all accounts:', accs);

    if (accs && accs.length > 0) {
      Promise.all(accs.map(accName => AccountFactory.load(accName)))
        .then(accounts => {
          accounts.forEach(acc => this.addRawAccount(acc));
        })
    }
  },

  clearList() {
    setAccountList([]);
  },

  isAuth() {
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

  getAccount(name) {
    return this.accounts.find(account => account.name === name);
  },

  addAccount(account) {
    const fullAccount = AccountFactory.restore(account);

    this.addRawAccount(fullAccount);
    this.save();
  },

  addRawAccount(acc) {
    this.accounts.push(acc);
  },

  save() {
    let accs = this.accounts.map(acc => acc.name);
    setAccountList(accs);

    this.saveAccounts();
  },

  saveAccounts() {
    this.accounts.forEach(acc => AccountFactory.save(acc))
  }
};
