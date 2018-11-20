import { ETH_GET_ACCOUNTS, ETH_APPROVE_TX, ETH_SIGN_TX } from 'constants/blockchains/eth';
import networks from '../../blockchain/index';
import ProviderEngine from 'web3-provider-engine';
import FixtureSubprovider from 'web3-provider-engine/subproviders/fixture.js';
import CacheSubprovider from 'web3-provider-engine/subproviders/cache.js';
import NonceSubprovider from 'web3-provider-engine/subproviders/nonce-tracker.js';
import HookedWalletSubprovider from 'web3-provider-engine/subproviders/hooked-wallet.js';
import RpcSubprovider from 'web3-provider-engine/subproviders/rpc.js';
import WebsocketSubprovider from 'web3-provider-engine/subproviders/websocket';
import SubscriptionsSubprovider from 'web3-provider-engine/subproviders/subscriptions';

export default messageSender => {
  return {
    getProvider: (chainId = 1) => {
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
          getAccounts (cb) {
            messageSender(ETH_GET_ACCOUNTS, chainId).then(payload => {
              // console.log(payload);
              cb(null, payload);
            });
          },
          approveTransaction (txdata, cb) {
            messageSender(ETH_APPROVE_TX, txdata).then(({ payload }) => {
              // console.log('approveTransaction', payload);
              cb(null, payload);
            });
          },
          signTransaction (txdata, cb) {
            messageSender(ETH_SIGN_TX, txdata).then(payload => {
              // console.log('signTransaction > ', txdata, payload);
              // if(error) throw new Error(error);

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

      const network = networks.ETH.network.find(item => item.chainId === chainId);
      engine.addProvider(
        new WebsocketSubprovider({
          rpcUrl: network.url
        })
      );

      engine.start();

      return engine;
    }
  };
};
