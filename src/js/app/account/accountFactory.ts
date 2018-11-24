import ntx, { BCSign } from 'bcnetwork';

import Account from '.';
import { BitcoinWallet } from './wallet/btc';
import EthWallet from './wallet/eth';
import { EosWallet } from './wallet/eos';

import { IAccountFactory, INetwork } from 'types/accounts';

const createWallet = ({ bc }) => {
  if (bc === BCSign.BTC || bc === BCSign.LTC || bc === BCSign.DOGE) {
    return new BitcoinWallet(bc);
  }

  if (bc === ntx.ETH.sign) {
    return new EthWallet();
  }

  if (bc === ntx.EOS.sign) {
    return new EosWallet();
  }

  throw new Error(`No support blockchain: ${bc}`);
};

export class AccountFactory {
  public static create(opts: IAccountFactory) {
    const { bc, network: forceNetwork } = opts;
    const wallet = createWallet({ bc });
    const networkSign = forceNetwork || ntx[bc].network[0].sign;
    const network: INetwork = ntx[bc].network.find(nt => nt.sign === networkSign);

    return new Account({ ...opts, wallet, network });
  }
}
