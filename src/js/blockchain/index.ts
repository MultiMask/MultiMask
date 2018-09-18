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
  }
};
