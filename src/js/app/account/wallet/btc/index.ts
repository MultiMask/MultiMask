import { info } from 'loglevel';
import { BIP32 } from 'bip32';

import explorer from './explorer';
import { IWallet, INetwork } from 'types/accounts';
import { BTCEngine } from './engine';
import { toSatoshi } from 'helpers/btc';

const DEFAULT_FEE = 5000; // Satoshi
const mapNetToExplore = (net: INetwork) => { 
  if (net.sign === 'testnet') {
    return explorer.coinsigns.BTCTEST;
  }

  if (net.sign === 'mainnet') {
    return explorer.coinsigns.BTC;
  }
}

export class BitcoinWallet implements IWallet {
  private walletKeys = null;
  public address = null;

  public network: INetwork;
  public segWit = false;

  /**
   * Create PK, address
   * @param pk 
   */
  public create (pk: BIP32 | string, network?: string) {
    this.changeNetwork(network);


    this.walletKeys = {
      keys: BTCEngine.getWallet(pk),
      segwit: this.segWit,
    }


    this.address = BTCEngine.getAddressFromKeys(this.walletKeys);

    return Promise.resolve();
  }

 
  /**
   * Change network
   * @param network 
   * @param pk 
   */
  public changeNetwork (network: any) {
    this.network = network;
  }

  public getAddress () {
    return this.address;
  }

  /**
   * Return info about blockchain
   */
  public getInfo () {
    return explorer.getInfo(this.address, mapNetToExplore(this.network))
      .then(({ data }) => {
        const payload = data.data;

        return {
          address: this.getAddress(),
          balance: payload.balance,
          network: this.network.sign,
          txs: payload.txs
        }
      })
  }

  /**
   * Send some coins
   * @param opts 
   */
  public sendCoins (opts) {
    let tx;
    return explorer.getUnspentTX(this.address, mapNetToExplore(this.network))
      .then(res => {
        const inputs = res.data.data.txs;
        const fee = opts.fee || DEFAULT_FEE

        tx = BTCEngine.getTxHash(this.walletKeys, inputs, opts.to, toSatoshi(opts.amount), fee);
        
        return explorer.pushTX(tx.hex, mapNetToExplore(this.network));
      })
      .then(res => {
        const payload = res.data;
        const status = payload.status;

        if (status === 'success') {
          return tx.id;
        }
      })
  }
}
