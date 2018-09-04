export default {
  BTC: {
    name: 'Bitcoin',
    sign: 'BTC',
    network: [
      // {
      //   name: 'Mainnet',
      //   sign: 'mainnet'
      // },
      {
        name: 'Testnet',
        sign: 'testnet'
      }
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
        chainId: 3
      },
      {
        name: 'Rinkeby',
        sign: 'rinkeby',
        chainId: 4
      }
    ]
  }
};
