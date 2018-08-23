import { ETH_GET_ACCOUNTS, ETH_APPROVE_TX, ETH_SIGN_TX } from './../../../constants/blockchains/eth';

import ProviderEngine from 'web3-provider-engine';
const FixtureSubprovider = require('web3-provider-engine/subproviders/fixture.js');
const CacheSubprovider = require('web3-provider-engine/subproviders/cache.js');
const NonceSubprovider = require('web3-provider-engine/subproviders/nonce-tracker.js');
const HookedWalletSubprovider = require('web3-provider-engine/subproviders/hooked-wallet.js');
const RpcSubprovider = require('web3-provider-engine/subproviders/rpc.js');
const WebsocketSubprovider = require('web3-provider-engine/subproviders/websocket');
const SubscriptionsSubprovider = require('web3-provider-engine/subproviders/subscriptions');

// eslint-disable-next-line
const INFURA_HTTP_URL = `https://ropsten.infura.io/v3/${infuraApiKey}`;
const INFURA_WS_URL = 'wss://ropsten.infura.io/ws';

export default sendFn => {
  const engine = new ProviderEngine();

  // static results
  engine.addProvider(
    new FixtureSubprovider({
      web3_clientVersion: 'MultiMask/v0.0.1',
      net_listening: true,
      eth_hashrate: '0x00',
      eth_mining: false,
      eth_syncing: true
    })
  );

  // cache layer
  engine.addProvider(new CacheSubprovider());

  // pending nonce
  engine.addProvider(new NonceSubprovider());

  engine.addProvider(
    new HookedWalletSubprovider({
      getAccounts: function(cb) {
        sendFn(ETH_GET_ACCOUNTS).then(({ payload }) => {
          cb(null, payload);
        });
      },
      approveTransaction: function(txdata, cb) {
        sendFn(ETH_APPROVE_TX, txdata).then(({ payload }) => {
          // console.log('approveTransaction', payload);
          cb(null, payload);
        });
      },
      signTransaction: function(txdata, cb) {
        sendFn(ETH_SIGN_TX, txdata).then(({ payload }) => {
          // console.log('signTransaction > ', txdata, payload);
          cb(null, payload);
        });
      }
    })
  );

  // Subscription
  const subscriptionSubprovider = new SubscriptionsSubprovider();
  subscriptionSubprovider.on('data', (err, notification) => {
    engine.emit('data', err, notification);
  });
  engine.addProvider(subscriptionSubprovider);

  engine.addProvider(
    // new RpcSubprovider({
    //   rpcUrl: INFURA_HTTP_URL
    // })
    new WebsocketSubprovider({
      rpcUrl: INFURA_WS_URL
    })
  );

  engine.start();

  return engine;
};
