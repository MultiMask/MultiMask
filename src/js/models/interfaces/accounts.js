export default ({ App, profileController }) => ({
  addAccount(account) {
    return profileController.addAccount(account);
  },

  getAccounts() {
    if (App.isReady()) return profileController.getAccounts();
  },

  getAccountsInfo() {
    if (App.isReady()) {
      return Promise.all(this.getAccounts().map(account => account.getInfo()));
    } else {
      return Promise.resolve();
    }
  },

  getSeed({ id }) {
    return profileController.ac.getSeed({ id });
  }
});
