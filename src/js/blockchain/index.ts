import * as bitcoin from 'bitcoinjs-lib';
export { BCList } from './bp44list';

export enum BCSign {
  BTC = 'BTC',
  ETH = 'ETH',
  EOS = 'EOS',
  LTC = 'LTC',
  DOGE = 'DOGE'
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
        btc: bitcoin.networks.bitcoin,
        explorerUrl: 'https://live.blockcypher.com/btc/',
        chainId: 'mainnet'
      },
      {
        name: 'Testnet',
        sign: 'testnet',
        url: 'https://testnet.blockchain.info',
        explorerUrl: 'https://live.blockcypher.com/btc-testnet/',
        btc: bitcoin.networks.testnet,
        chainId: 'testnet'
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
      //   url: 'https://mainnet.infura.io/',
      //   explorerUrl: 'https://etherscan.io/',
      //   chainId: 1
      // },
      {
        name: 'Ropsten',
        sign: 'ropsten',
        url: 'https://ropsten.infura.io/',
        explorerUrl: 'https://ropsten.etherscan.io/',
        chainId: 3
      },
      {
        name: 'Rinkeby',
        sign: 'rinkeby',
        url: 'https://rinkeby.infura.io',
        explorerUrl: 'https://rinkeby.etherscan.io/',
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
        url: 'http://jungle.cryptolions.io:18888',
        explorerUrl: 'test'
      }
    ]
  },
  LTC: {
    name: 'LTC',
    sign: BCSign.LTC,
    network: [
      {
        name: 'Mainnet',
        sign: 'mainnet',
        btc: {
          messagePrefix: '\x19Litecoin Signed Message:\n',
          bip32: {
            public: 0x019da462,
            private: 0x019d9cfe
          },
          pubKeyHash: 0x30,
          scriptHash: 0x32,
          wif: 0xb0
        },
        explorerUrl: 'https://live.blockcypher.com/ltc/',
        chainId: 'mainnet'
      }
    ]
  },
  DOGE: {
    name: 'DOGE',
    sign: BCSign.LTC,
    network: [
      {
        name: 'Mainnet',
        sign: 'mainnet',
        btc: {
          messagePrefix: '\x19Dogecoin Signed Message:\n',
          bip32: {
              public: 0x02facafd,
              private: 0x02fac398
          },
          pubKeyHash: 0x1e,
          scriptHash: 0x16,
          wif: 0x9e
        },
        explorerUrl: 'https://live.blockcypher.com/doge/',
        chainId: 'mainnet'
      }
    ]
  }
};
