import Web3 = require('web3');
import ethTx = require('ethereumjs-tx');

import * as ethUtil from 'ethereumjs-util';
import * as bip39 from 'bip39';
import hdkey from 'hdkey';

import EtherApi from 'etherscan-api';

let web3 = new Web3();
const etherApi = EtherApi.init(etherscanApiKey, 'ropsten', '10000');

export default class Engine {
  generateMnemonic() {
    return bip39.generateMnemonic();
  }

  getSeedFromMnemonic(mnemonic) {
    return bip39.mnemonicToSeed(mnemonic);
  }

  getPrivKeyFromSeed(seed) {
    const root = hdkey.fromMasterSeed(seed);
    // Get first eth wallet from HDwallet
    // eslint-disable-next-line
    const addrNode = root.derive("m/44'/60'/0'/0/0");

    return {
      priv: ethUtil.bufferToHex(addrNode._privateKey),
      privHex: addrNode._privateKey
    };
  }

  getEthereumAddress(privKey) {
    let addressHex = ethUtil.privateToAddress(privKey);
    return ethUtil.bufferToHex(addressHex);
  }

  getPublic(privKey) {
    return ethUtil.privateToPublic(privKey);
  }

  signEthTx({ privKey, amount, from, to }) {
    const tx = new ethTx({
      to,
      from,
      value: web3.utils.toHex(web3.utils.toBN(amount)),
      gasLimit: web3.utils.toHex(web3.utils.toBN('21000')),
      gasPrice: web3.utils.toHex(web3.utils.toWei('1', 'gwei')),
      nonce: web3.utils.toHex(0)
    });
    tx.sign(privKey);
    const txSerialized = '0x' + tx.serialize().toString('hex');
    return txSerialized;
  }

  signRawTx(data, privKey) {
    const tx = new ethTx(data);
    tx.sign(privKey);
    const txSerialized = '0x' + tx.serialize().toString('hex');
    return txSerialized;
  }

  sendERC20Tx(privKey, amount, tokenAbi, tokenAddress, receiverAddress) {
    const senderAddress = this.getEthereumAddress(privKey);
    const contract = new web3.eth.Contract(tokenAbi, tokenAddress);
    const bytecode = contract.methods.transfer(receiverAddress, amount).encodeABI();
    const tx = new ethTx({
      to: tokenAddress,
      from: senderAddress,
      value: web3.utils.toHex(amount),
      gasLimit: web3.utils.toHex(web3.utils.toBN('75000')),
      gasPrice: web3.utils.toHex(web3.utils.toWei('1', 'gwei')),
      nonce: web3.utils.toHex(0),
      data: bytecode
    });
    tx.sign(privKey);
    const txSerialized = '0x' + tx.serialize().toString('hex');
    return txSerialized;
  }

  getTransactions(address) {
    return new Promise((res, rej) => {
      etherApi.account
        .txlist(address, 0, 9999999999999, 'desc')
        .then(data => {
          res(data.result);
        })
        .catch(data => {
          res([]);
        });
    });
  }
}
