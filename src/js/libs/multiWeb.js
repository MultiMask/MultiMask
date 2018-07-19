import { TX_PAYMENT } from '../constants/tx';

import networks from './../blockchain';

export default class MultiWeb {
  constructor({ stream }) {
    this.stream = stream;
  }

  _send(data) {
    this.stream.write(data);
  }

  isAuth() {}
  getUser() {}
  sendTransaction({ to, amount, data }) {
    // console.log('send', to, amount, data);

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
  sendVote(to) {}
}
