import { TX_PAYMENT } from '../constants/tx';
import networks from './../blockchain';
import Web3Provider from './plugins/eth';

export default class MultiWeb {
  constructor({ stream }) {
    this.stream = stream;

    this.web3 = new Web3Provider({ stream });
    this.web3.listeners();
    this.web3.init();
  }

  _send(data) {
    this.stream.write(data);
  }

  isAuth() {}
  getUser() {}
  sendTransaction({ to, amount, data }) {
    this._send({
      type: TX_PAYMENT,
      payload: {
        blockchain: networks.BTC.sign,
        tx: {
          to,
          amount,
          data
        }
      }
    });
  }

  getWeb3Provider() {
    return this.web3;
  }
}
