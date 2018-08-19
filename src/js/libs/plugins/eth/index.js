import { ETH_GET_ACCOUNTS, ETH_APPROVE_TX, ETH_SIGN_TX } from './../../../constants/blockchains/eth';

import ProviderEngine from 'web3-provider-engine';
const HookedWalletSubprovider = require('web3-provider-engine/subproviders/hooked-wallet.js');
const RpcSubprovider = require('web3-provider-engine/subproviders/rpc.js');
const WebsocketSubprovider = require('web3-provider-engine/subproviders/websocket');

// eslint-disable-next-line
const INFURA_HTTP_URL = `https://ropsten.infura.io/v3/${infuraApiKey}`;
const INFURA_WS_URL = 'wss://ropsten.infura.io/ws';

export default sendFn => {
  const engine = new ProviderEngine();

  engine.addProvider(
    new HookedWalletSubprovider({
      getAccounts: function(cb) {
        sendFn(ETH_GET_ACCOUNTS).then(({ payload }) => {
          cb(null, payload);
        });
      },
      approveTransaction: function(txdata, cb) {
        sendFn(ETH_APPROVE_TX, txdata).then(({ payload }) => {
          console.log('approveTransaction', payload);
          cb(null, payload);
        });
      },
      signTransaction: function(txdata, cb) {
        sendFn(ETH_SIGN_TX, txdata).then(({ payload }) => {
          console.log('signTransaction > ', txdata, payload);
          cb(null, payload);
        });
      }
    })
  );

  engine.addProvider(
    // new RpcSubprovider({
    //   rpcUrl: INFURA_HTTP_URL
    // })
    new WebsocketSubprovider({
      rpcUrl: INFURA_WS_URL
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
