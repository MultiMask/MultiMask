import Web3 from 'web3';
import ProviderEngine from 'web3-provider-engine';
const HookedWalletSubprovider = require('web3-provider-engine/subproviders/hooked-wallet.js');
const RpcSubprovider = require('web3-provider-engine/subproviders/rpc.js');

var engine = new ProviderEngine();
var web3 = new Web3(engine);

engine.addProvider(
  new HookedWalletSubprovider({
    getAccounts: function(cb) {
      console.log('get accounts', cb);
      console.log(cb);
    },
    signTransaction: function(cb) {
      console.log('signTransaction', cb);
      console.log(cb);
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

export default web3;
