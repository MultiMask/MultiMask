import ntx from 'bcnetwork';

import Account from '.';
import { BitcoinWallet } from './wallet/btc';
import EthWallet from './wallet/eth';
import { EosWallet } from './wallet/eos';

const createWallet = ({ bc }) => {
  if (bc === ntx.BTC.sign) {
    return new BitcoinWallet();
  }

  if (bc === ntx.ETH.sign) {
    const defaultETHNetwork = ntx.ETH.network[0].sign;
    return new EthWallet(defaultETHNetwork);
  }

  if (bc === ntx.EOS.sign) {
    const defaultEOSNetwork = ntx.EOS.network[0];
    return new EosWallet(defaultEOSNetwork);
  }

  throw new Error(`No support blockchain: ${bc}`);
};

export class AccountFactory {
  public static create (opts) {
    const { bc } = opts;
    const wallet = createWallet({ bc });
    const network = opts.network || ntx[bc].network[0].sign;

    return new Account({ ...opts, wallet, network });
  }
};
