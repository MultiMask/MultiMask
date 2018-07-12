import { getAccountList, setAccountList, getPass } from './getter';
import { encode } from './../libs/cipher';
import AccountFactory from './accountFactory';

export default class AccountManager {
  accounts = [];

  constructor({ App }) {
    this.App = App;
  }

  restoreWallets() {
    getAccountList().then(this.restore.bind(this));
  }

  restore(accounts) {
    console.log('load all accounts:', accounts);

    if (accounts && accounts.length > 0) {
      return this.loadAccounts(accounts).then(accounts => {
        accounts.forEach(this.addRawAccount);

        return this.accounts;
      });
    } else {
      return Promise.resolve([]);
    }
  }

  addAccount(account) {
    const fullAccount = AccountFactory.restore(account);

    this.addRawAccount(fullAccount);
    this.save();
  }

  addRawAccount = account => {
    this.accounts.push(account);
  };

  getAccount(name) {
    return this.accounts.find(account => account.name === name);
  }

  getAccounts() {
    if (this.App.isAuth()) {
      return this.accounts;
    }

    return [];
  }

  getSeed({ name }) {
    if (this.App.isAuth()) {
      const account = this.getAccount(name);

      if (account) {
        const seed = account.wallet.seed;

        return encode(this.App.getPass(), seed);
      }
    }

    return null;
  }

  save() {
    let accs = this.accounts.map(acc => acc.name);
    setAccountList(accs);

    this.saveAccounts();
  }

  saveAccounts() {
    this.accounts.forEach(account => AccountFactory.save(this.App.getPass(), account));
  }

  loadAccounts(accounts) {
    return Promise.all(accounts.map(accountName => AccountFactory.load(this.App.getPass(), accountName)));
  }

  clearList() {
    this.accounts = [];
  }
}
