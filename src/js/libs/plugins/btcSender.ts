import BTC from './btcPlugin';
import { _send } from '../crypto3';
import { ISender, ISenderParams } from './types';

class BTCSender implements ISender {
  public readonly to: string;
  public readonly from: string;
  public readonly data: string;
  public readonly amount: number;

  constructor ({ from, to, data, amount }: ISenderParams) {
    this.from = from;
    this.to = to;
    this.data = data;
    this.amount = amount * 1e8; // convert to Satoshi
  }

  public async send (): Promise<string | Error> {
    const tx = {
      from: this.from,
      to: this.to,
      amount: this.amount,
      data: this.data
    };

    return BTC(_send).send(tx);
  }
}

export default BTCSender;
