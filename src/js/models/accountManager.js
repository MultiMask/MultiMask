import { getAccountList, setAccountList } from './getter';
import AccountFactory from './accountFactory';

export default class AccountManager {
  accounts = [];

  restoreWallets() {
    getAccountList().then(this.restore.bind(this));
  }

  restore(accs) {
    console.log('load all accounts:', accs);

    if (accs && accs.length > 0) {
      Promise.all(accs.map(accName => AccountFactory.load(accName)))
        .then(accounts => {
          accounts.forEach(acc => this.addRawAccount(acc));
        })
    }
  }

  addAccount(account) {
    const fullAccount = AccountFactory.restore(account);

    this.addRawAccount(fullAccount);
    this.save();
  }

  addRawAccount(acc) {
    this.accounts.push(acc);
  }

  getAccount(name) {
    return this.accounts.find(account => account.name === name);
  }

  getAccounts() {
    return this.accounts;
  }

  getSeed({ name }) {
    return this.getAccount(name);
  }

  save() {
    let accs = this.accounts.map(acc => acc.name);
    setAccountList(accs);

    this.saveAccounts();
  }

  saveAccounts() {
    this.accounts.forEach(acc => AccountFactory.save(acc))
  }

  clearList() {
    setAccountList([]);
  }
}
