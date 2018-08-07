export default ({ ethController }) => ({
  getAccounts() {
    return ethController.getAccounts();
  },

  approveTx(tx) {
    return ethController.approveTx(tx);
  },

  signTx(tx) {
    return ethController.signTx(tx);
  }
});
