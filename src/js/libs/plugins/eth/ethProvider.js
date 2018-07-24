import ProviderEngine from 'web3-provider-engine';
const HookedWalletSubprovider = require('web3-provider-engine/subproviders/hooked-wallet.js');
const RpcSubprovider = require('web3-provider-engine/subproviders/rpc.js');

var engine = new ProviderEngine();

engine.addProvider(
  new HookedWalletSubprovider({
    getAccounts: function(cb) {
      console.log('get accounts', cb);
      cb(null, []);
    },
    approveTransaction: function(txdata, cb) {
      console.log('approveTransaction', txdata, cb);
    },
    signTransaction: function(txdata, cb) {
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

export default engine;
