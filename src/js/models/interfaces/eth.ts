// import txCtrl from './../providers/tx';

export default ({ ethController }) => ({
  getAccounts() {
    return ethController.getAccounts();
  },

  approveTx(tx) {
    const data = ethController.approveTx(tx);
    // return txCtrl.approveTx(data);
  },

  signTx({ tx }) {
    return new Promise((res, rej) => {
      const signed = ethController.signTx(tx);
      res(signed);
    });
  }
});
