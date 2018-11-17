import Web3 = require('web3');
import { info } from 'loglevel';
import { BIP32 } from 'bip32';

import { IWallet, INetwork } from 'types/accounts';
import EthEngine from './engine';

const web3 = new Web3();

export default class EthWallet implements IWallet {
  public engine: EthEngine;
  public network: INetwork;
  private privateKey: any;
  public address: any;
  public nonce: any;
  public networkUrl: string;

  public create (pk: BIP32 | string, network?: INetwork) {
    this.changeNetwork(network);
    ({ address: this.address, privateKey: this.privateKey } = this.engine.getPrivKeyFromSeed(pk));

    return Promise.resolve();
  }

  public changeNetwork (network: INetwork) {
    this.network = network;


    web3.setProvider(new Web3.providers.HttpProvider(this.network.url))
    this.engine = new EthEngine(this.network.sign);
  }
  
  public getAddress () {
    return this.address;
  }

  public getInfo (): any {
    return Promise.all([web3.eth.getBalance(this.address), this.engine.getTransactions(this.address)]).then(
      ([amountInWei, txs]) => {
        this.nonce = txs && txs[0] ? +txs[0].nonce : 0;

        return {
          address: this.address,
          balance: +web3.utils.fromWei(amountInWei, 'ether'),
          network: this.network.sign,
          txs
        };
      }
    );
  }

  public getNextNonce () {
    return this.nonce + 1;
  }

  public updateNonce () {
    this.nonce++;
  }

  public sendCoins ({ to, amount, data }) {
    const amountInWei = web3.utils.toWei(amount.toString(), 'ether');

    const tx = this.engine.signEthTx({
      privKey: this.privateKey,
      amount: amountInWei,
      to,
      from: this.address
    });

    info(tx);

    return new Promise((res, rej) => {
      web3.eth.sendSignedTransaction(tx, function (err, transactionHash) {
        if (err) {
          rej(err);
        }

        info('Transaction success > ', transactionHash);
        res(transactionHash);
      });
    });
  }

  // TODO: provide to Account entity
  public signRawTx (data) {
    return this.engine.signRawTx(data, this.privateKey);
  }
}
