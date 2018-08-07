import { ETH_GET_ACCOUNTS, ETH_APPROVE_TX, ETH_SIGN_TX } from './../../../constants/blockchains/eth';

import ProviderEngine from 'web3-provider-engine';
const HookedWalletSubprovider = require('web3-provider-engine/subproviders/hooked-wallet.js');
const RpcSubprovider = require('web3-provider-engine/subproviders/rpc.js');

export default sendFn => {
  const engine = new ProviderEngine();

  engine.addProvider(
    new HookedWalletSubprovider({
      getAccounts: function(cb) {
        sendFn(ETH_GET_ACCOUNTS).then(({ payload }) => {
          // console.log('result', payload);
          cb(null, payload);
        });
        // console.log('get accounts', cb);
        // cb(null, []);
      },
      approveTransaction: function(txdata, cb) {
        sendFn(ETH_APPROVE_TX, txdata).then(({ payload }) => {
          console.log('approveTransaction', payload, cb);
        });
      },
      signTransaction: function(txdata, cb) {
        sendFn('eth:signTx');
        console.log('signTransaction', txdata, cb);
      }
    })
  );

  engine.addProvider(
    new RpcSubprovider({
      rpcUrl: 'https://ropsten.infura.io/'
    })
  );

  // network connectivity error
  engine.on('error', function(err) {
    // report connectivity errors
    console.error(err.stack);
  });

  engine.start();

  return engine;
};
