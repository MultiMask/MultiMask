import EOS from './eosPlugin';
import Eos from 'eosjs';
import { _send } from '../crypto3';
import { ISenderParams, ISender } from './types';

const chainId = '038f4b0fc8ff18a4f0842a8f0564611f6e96e8535901dd45e43ac8691a1c4dca';
const networkEOS = {
  protocol: 'http',
  blockchain: 'eos',
  host: 'jungle.cryptolions.io',
  port: 18888,
  chainId
};

class EOSSender implements ISender {
  public readonly to: string;
  public readonly from: string;
  public readonly data: string;
  public readonly amount: number;
  public readonly blockchainType: BCType;
  public readonly chainId: number;

  constructor ({ from, to, data, amount }: ISenderParams) {
    this.from = from;
    this.to = to;
    this.data = data;
    this.amount = amount;
  }

  public async send () {
    const eos = EOS(_send)(
      networkEOS,
      Eos,
      {
        chainId: networkEOS.chainId,
        httpEndpoint: `http://${networkEOS.host}:${networkEOS.port}`
      },
      'http'
    );

    return await eos.transaction({
      actions: [
        {
          account: 'eosio.token',
          name: 'transfer',
          authorization: [
            {
              actor: 'ducone',
              permission: 'active'
            }
          ],
          data: {
            from: this.from,
            to: this.to,
            quantity: this.amount, // '0.1300 EOS',
            memo: ''
          }
        }
      ]
    });
  }
}

export default EOSSender;
