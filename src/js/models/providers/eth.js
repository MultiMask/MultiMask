import txCtrl from './tx';
import networks from './../../blockchain';
import EtherApi from 'etherscan-api';
import Web3 from 'web3';

// eslint-disable-next-line
const etherApi = EtherApi.init(etherscanApiKey, 'ropsten', '3000');

export default class EthController {
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
    return {
      ...data,
      tx: {
        ...data.tx,
        ...this.enhanceTXdata(data.tx)
      }
    };
  }

  signTx(tx) {
    const account = this.getAccount(tx.from);

    if (account) {
      return account.wallet.signRawTx(tx);
    }
    return tx;
  }

  enhanceTXdata(tx) {
    // const account = this.getAccount(tx.from);

    // Promise.all([account.getInfo(), etherApi.proxy.eth_gasPrice()]).then(console.log);
    // console.log(this.getAccount(tx.from));
    // console.log('enhance TX > ', tx);

    return {
      ...tx,
      gasLimit: Web3.utils.toHex(Web3.utils.toBN('21000')),
      gasPrice: Web3.utils.toHex(Web3.utils.toWei('1', 'gwei')),
      nonce: Web3.utils.toHex(40)
    };
  }
}
