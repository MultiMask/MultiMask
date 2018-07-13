export default class AccountInterfaces {
  constructor({ accountController, profileController }) {
    this.am = accountController;
    this.pc = profileController;
  }

  addAccount(account) {
    return this.pc.addAccount(account);
  }

  getAccounts() {
    return this.am.getAccounts();
  }

  getSeed({ name }) {
    return this.am.getSeed({ name });
  }
}
