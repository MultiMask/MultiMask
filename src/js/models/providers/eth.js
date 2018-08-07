import networks from './../../blockchain';

export default class EthController {
  constructor({ accountController }) {
    this.ac = accountController;
  }

  getAccounts() {
    return this.ac
      .getAccounts()
      .filter(account => {
        return account.blockchain === networks.ETH.sign;
      })
      .map(account => account.getAddress());
  }

  approveTx(tx) {
    return tx;
  }

  signTx(tx) {
    return tx;
  }
}
