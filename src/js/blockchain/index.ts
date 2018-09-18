export default {
  BTC: {
    name: 'Bitcoin',
    sign: 'BTC',
    network: [
      // {
      // 	name: 'Mainnet',
      // 	sign: 'mainnet'
      // },
      {
        name: 'Testnet',
        sign: 'testnet',
        url: 'https://testnet.blockchain.info'
      }
      // {
      //   name: 'Livenet',
      //   sign: 'livenet'
      // }
    ]
  },
  ETH: {
    name: 'Ethereum',
    sign: 'ETH',
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
    sign: 'EOS',
    network: [
      {
        name: 'Jungle Testnet',
        sign: 'testnet',
        chainId: '038f4b0fc8ff18a4f0842a8f0564611f6e96e8535901dd45e43ac8691a1c4dca',
        url: 'http://193.93.219.219:8888'
      }
    ]
  }
};
