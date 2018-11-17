import Web3 = require('web3');
import { info } from 'loglevel';
import EthEngine from './engine';
import networks from 'bcnetwork'

const web3 = new Web3();

export default class EthWallet implements IWallet {
  public engine: EthEngine;
  public network: any;
  private privateKey: any;
  public address: any;
  public nonce: any;
  public networkUrl: string;

  public create (pk: Buffer | string, network?: string) {
    this.changeNetwork(network);
    ({ address: this.address, privateKey: this.privateKey } = this.engine.getPrivKeyFromSeed(pk));

    return Promise.resolve();
  }

  public changeNetwork (network: string) {
    this.network = network;
    const networkProps = networks.ETH.network.find(item => item.sign === network)
    this.networkUrl = networkProps.url;

    web3.setProvider(new Web3.providers.HttpProvider(this.networkUrl))
    this.engine = new EthEngine(network);
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
          network: this.network,
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

  public async sendCoins ({ to, amount, data}) {
    const amountInWei = web3.utils.toWei(amount.toString(), 'ether');
    const nonce = await web3.eth.getTransactionCount(this.address)
  
    const tx = this.engine.signEthTx({
      privKey: this.privateKey,
      amount: amountInWei,
      to,
      from: this.address,
      nonce
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
