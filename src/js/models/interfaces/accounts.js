export default class AccountInterfaces {
  constructor({ profileController }) {
    this.pc = profileController;
  }

  addAccount(account) {
    return this.pc.addAccount(account);
  }

  getAccounts() {
    return this.pc.getAccounts();
  }

  getSeed({ id }) {
    return this.pc.ac.getSeed({ id });
  }
}
