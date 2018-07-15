import { encode } from '../../libs/cipher';
import AccountFactory from './accountFactory';

export default class AccountController {
  accounts = [];

  constructor({ App }) {
    this.App = App;
  }

  restore(accounts, pass) {
    console.log('AccountController > load all accounts > ', accounts);

    if (accounts && accounts.length > 0) {
      return this.loadAccountsByIds(pass, accounts).then(accounts => {
        accounts.forEach(this.addAccountInstance);

        return this.accounts;
      });
    } else {
      return Promise.resolve([]);
    }
  }

  addAccountInstance = account => {
    if (!this.getAccountById(account.id)) {
      this.accounts.push(account);
    }
  };

  getAccountById(id) {
    return this.accounts.find(account => account.id === id);
  }

  getAccounts() {
    if (this.App.isAuth()) {
      return this.accounts;
    }

    return [];
  }

  getSeed({ id }) {
    if (this.App.isAuth()) {
      const account = this.getAccountById(id);

      if (account) {
        const seed = account.wallet.seed;

        return encode(this.App.getPass(), seed);
      }
    }

    return null;
  }

  _save(accountInstance, pass) {
    AccountFactory.save(pass, accountInstance);
  }

  loadAccountsByIds(pass, ids) {
    console.log('load account list > ', ids);
    return AccountFactory.loadListByIds(pass, ids);
  }

  clearList() {
    this.accounts = [];
  }
}
