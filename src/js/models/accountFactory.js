import BitcoinWallet from './account/wallet/bitcoin';
import Account from './account';

import { getWallet, setWallet } from './getter';
import networks from './../blockchain';

export default {
  create({ blockchain, network, seed }) {
    let wallet;

    if (blockchain === networks.BTC.sign) {
      wallet = new BitcoinWallet(network);
    }

    return new Account({ wallet, network, blockchain, seed });
  },

  restore(account) {
    const { name, wallet, blockchain, network } = account;
    console.log('Restore wallet:>', name, blockchain, network);

    let walletInstance;
    if (blockchain === networks.BTC.sign) {
      walletInstance = new BitcoinWallet(network);
    }

    return new Account({
      wallet: walletInstance,
      seed: wallet.seed,
      name,
      blockchain,
      network
    });
  },

  save(account) {
    const str = JSON.stringify(account);
    // TODO: Add encoding
    const encodedWallet = str;

    // console.log('save account raw:', encodedWallet);
    setWallet(account.name, encodedWallet);
  },

  load(accountName) {
    return getWallet(accountName).then(str => {
      // TODO: add decoded
      const decoded = JSON.parse(str);

      return this.restore(decoded);
    });
  }
};
