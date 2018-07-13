import { getWallet, setWallet } from '../getter';
import { encode, decode } from '../../libs/cipher';
import networks from '../../blockchain';

import BitcoinWallet from './wallet/bitcoin';
import Account from '.';

export default {
  create({ blockchain, network, seed }) {
    let wallet;

    if (blockchain === networks.BTC.sign) {
      wallet = new BitcoinWallet(network);
    }

    return new Account({ wallet, network, blockchain, seed });
  },

  restore({ name, wallet, blockchain, network }) {
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

  save(pass, account) {
    const str = JSON.stringify(account);
    const encodedWallet = encode(pass, str);

    setWallet(account.name, encodedWallet);
  },

  load(pass, accountName) {
    return getWallet(accountName).then(str => {
      const decoded = JSON.parse(decode(pass, str));

      return this.restore(decoded);
    });
  }
};
