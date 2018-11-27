import * as bitcoin from 'bitcoinjs-lib';
export { BCList } from './bp44list';

export enum BCSign {
  BTC = 'BTC',
  ETH = 'ETH',
  EOS = 'EOS',
  LTC = 'LTC',
  DOGE = 'DOGE'
}

export const getBcNet = (bc: BCSign, net: string): INetwork => networks[bc].network.find(item => item.sign === net);

export interface INetwork {
  name: string,
  sign: string,
  url?: string,
  btc?: any,
  explorerUrl?: string,
  chainId?: string | number;
}

export interface IBlockchain {
  name: string,
  sign: BCSign,
  network: INetwork[]
}
export interface IBlockchains extends Record<BCSign, IBlockchain> {}
const networks: IBlockchains = {
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
      {
        name: 'Mainnet',
        sign: 'mainnet',
        url: 'wss://mainnet.infura.io/ws',
        explorerUrl: 'https://etherscan.io/',
        chainId: 1
      },
      {
        name: 'Ropsten',
        sign: 'ropsten',
        url: 'wss://ropsten.infura.io/ws',
        explorerUrl: 'https://ropsten.etherscan.io/',
        chainId: 3
      },
      {
        name: 'Rinkeby',
        sign: 'rinkeby',
        url: 'wss://rinkeby.infura.io/ws',
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
        name: 'Mainnet',
        sign: 'mainnet',
        chainId: 'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906',
        url: 'http://mainnet.eoscalgary.io:80',
        explorerUrl: 'https://eospark.com/MainNet/'
      },
      {
        name: 'Jungle Testnet',
        sign: 'testnet',
        chainId: '038f4b0fc8ff18a4f0842a8f0564611f6e96e8535901dd45e43ac8691a1c4dca',
        url: 'http://jungle.eosgen.io:80',
        explorerUrl: 'https://eospark.com/Jungle/'
      }
    ]
  },
  LTC: {
    name: 'Litecoin',
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
    name: 'Dogecoin',
    sign: BCSign.DOGE,
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
export default networks;
