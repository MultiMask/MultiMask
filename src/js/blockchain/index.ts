import * as bitcoin from 'bitcoinjs-lib';
export { BCList } from './bp44list';

export enum BCSign {
  BTC = 'BTC',
  ETH = 'ETH',
  EOS = 'EOS'
}

export default {
  BTC: {
    name: 'Bitcoin',
    sign: BCSign.BTC,
    network: [
      {
        name: 'Mainnet',
        sign: 'mainnet',
        url: 'https://blockchain.info',
        btc: bitcoin.networks.bitcoin
      },
      {
        name: 'Testnet',
        sign: 'testnet',
        url: 'https://testnet.blockchain.info',
        btc: bitcoin.networks.testnet
      }
    ]
  },
  ETH: {
    name: 'Ethereum',
    sign: BCSign.ETH,
    network: [
      // {
      //   name: 'Main',
      //   sign: 'main',
      //   chainId: 1
      // },
      {
        name: 'Ropsten',
        sign: 'ropsten',
        url: 'https://ropsten.infura.io/',
        chainId: 3
      },
      {
        name: 'Rinkeby',
        sign: 'rinkeby',
        url: 'https://rinkeby.infura.io',
        chainId: 4
      }
    ]
  },
  EOS: {
    name: 'EOS',
    sign: BCSign.EOS,
    network: [
      {
        name: 'Jungle Testnet',
        sign: 'testnet',
        chainId: '038f4b0fc8ff18a4f0842a8f0564611f6e96e8535901dd45e43ac8691a1c4dca',
        url: 'http://jungle.cryptolions.io:18888'
      }
    ]
  }
};
