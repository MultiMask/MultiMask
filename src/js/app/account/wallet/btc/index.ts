import { info } from 'loglevel';
import { BIP32 } from 'bip32';

import explorer from './explorer';
import { IWallet, INetwork } from 'types/accounts';
import { BTCEngine } from './engine';
import { toSatoshi } from 'helpers/btc';
import { BCSign } from 'bcnetwork';

const DEFAULT_FEE = 5000; // Satoshi
const mapNetToExplore = (bc: BCSign, net: INetwork) => { 
  if (bc === BCSign.LTC) {
    return explorer.coinsigns.LTC;
  }

  if (bc === BCSign.DOGE) {
    return explorer.coinsigns.DOGE;
  }

  if (net.sign === 'testnet') {
    return explorer.coinsigns.BTCTEST;
  }

  if (net.sign === 'mainnet') {
    return explorer.coinsigns.BTC;
  }
}
const getTBVersion = (bc: BCSign) => {
  if (bc === BCSign.DOGE) {
    return 1;
  }

  return null;
}

export class BitcoinWallet implements IWallet {
  private walletKeys = null;
  public address = null;

  public bc: BCSign;
  public network: INetwork;
  public segWit = false;

  constructor (bc: BCSign) {
    this.bc = bc;
  }

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
    return explorer.getInfo(this.address, mapNetToExplore(this.bc, this.network))
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
    return explorer.getUnspentTX(this.address, mapNetToExplore(this.bc, this.network))
      .then(res => {
        const inputs = res.data.data.txs;
        const fee = opts.fee || DEFAULT_FEE

        tx = BTCEngine.getTxHash(this.walletKeys, inputs, opts.to, toSatoshi(opts.amount), fee, getTBVersion(this.bc));

        return explorer.pushTX(tx.hex, mapNetToExplore(this.bc, this.network));
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
