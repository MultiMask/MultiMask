import EOS from './eosPlugin';
import Eos from 'eosjs';
import { _send } from '../crypto3';
import networks from '../../blockchain/index';
import { ISender, ISenderParams } from 'types/crypto3';
import { BCSign } from 'bcnetwork';

class EOSSender implements ISender {
  public readonly to: string;
  public readonly from: string;
  public readonly data: string;
  public readonly amount: number;
  public readonly blockchainType: BCSign;
  public readonly chainId: string;

  constructor ({ from, to, data, amount, chainId }: ISenderParams) {
    this.from = from;
    this.to = to;
    this.data = data;
    this.amount = amount;
    this.chainId = chainId as string;
  }

  public async send () {
    const network = networks.EOS.network.find(item => item.chainId === this.chainId);
    const networkEOS = this.getNetworkEOS(network);

    const eos = EOS(_send).getEos(
      networkEOS,
      Eos,
      {
        chainId: this.chainId,
        httpEndpoint: network.url
      },
      'http'
    );

    return await eos
      .getIdentity(this.chainId)
      .then(res => {
        const currentUser = res.accounts.find(item => item.address === this.to);

        const transData = {
          actions: [
            {
              account: 'eosio.token',
              name: 'transfer',
              authorization: [
                {
                  actor: currentUser.name,
                  permission: currentUser.authority
                }
              ],
              data: {
                from: this.from,
                to: this.to,
                quantity: '0.1300 EOS',
                memo: this.data
              }
            }
          ]
        };

        return eos.transaction(transData);
      })
      .then(txHash => {
        console.log('tx hash', txHash);
        return txHash;
      });
  }

  private getNetworkEOS (network) {
    const url = new URL(network.url);
    return {
      protocol: url.protocol,
      blockchain: 'eos',
      host: url.hostname,
      port: url.port,
      chainid: this.chainId
    };
  }
}

export default EOSSender;
