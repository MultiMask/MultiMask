export default class AccountInterfaces {
  constructor({ accountManager }) {
    this.am = accountManager;
  }

  addAccount(account) {
    return this.am.addAccount(account);
  }

  getAccounts() {
    return this.am.getAccounts();
  }

  getSeed({ name }) {
    return this.am.getSeed({ name });
  }
}
