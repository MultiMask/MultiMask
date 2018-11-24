import ETH from './ethPlugin';
import { _send } from '../crypto3';
import Web3 from 'web3';
import { ISender, ISenderParams } from 'types/crypto3';

class ETHSender implements ISender {
  public readonly to: string;
  public readonly from: string;
  public readonly data: string;
  public readonly amount: number;
  public readonly chainId: number;

  constructor({ from, to, data, amount }: ISenderParams) {
    this.from = from;
    this.to = to;
    this.data = data;
    this.amount = amount;
  }

  public async send() {
    const web3 = new Web3(ETH(_send).getProvider(this.chainId));
    const result = await web3.eth.sendTransaction(
      {
        from: this.from,
        to: this.to,
        data: this.data,
        value: web3.utils.toWei(this.amount, 'ether')
      },
      (error, txHash) => {
        if (error) {
          return error;
        }
        return txHash;
      }
    );
    return result.transactionHash;
  }
}

export default ETHSender;
