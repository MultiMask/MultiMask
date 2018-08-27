import networks from './../../blockchain';
import EtherApi from 'etherscan-api';
import Web3 = require('web3');
let web3: Web3;

// eslint-disable-next-line
const etherApi = EtherApi.init(etherscanApiKey, 'ropsten', '3000');

export default class EthController {
  public ac;

  constructor({ accountController }) {
    this.ac = accountController;
  }

  getAccountsModel() {
    return this.ac.getAccounts().filter(account => {
      return account.blockchain === networks.ETH.sign;
    });
  }

  getAccounts() {
    return this.getAccountsModel().map(account => account.getAddress());
  }

  getAccount(address) {
    return this.getAccountsModel().find(acc => acc.getAddress() == address);
  }

  approveTx(data) {
    const account = this.getAccount(data.tx.from);

    return {
      ...data,
      tx: {
        ...data.tx,
        // Default
        gasLimit: web3.utils.toHex(web3.utils.toBN('21000')),
        gasPrice: web3.utils.toHex(web3.utils.toWei('1', 'gwei')),
        nonce: web3.utils.toHex(account.wallet.getNextNonce().toString())
      }
    };
  }

  signTx(tx) {
    const account = this.getAccount(tx.from);

    if (account) {
      account.wallet.updateNonce();
      return account.wallet.signRawTx(tx);
    }
    return tx;
  }
}
