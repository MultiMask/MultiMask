import Web3 = require('web3');
import ethTx = require('ethereumjs-tx');

import * as ethUtil from 'ethereumjs-util';
import * as bip39 from 'bip39';
import hdkey from 'hdkey';

import EtherApi from 'etherscan-api';

const web3 = new Web3();

export default class Engine {
  public etherApi: any;

  constructor (network) {
    this.etherApi = EtherApi.init(etherscanApiKey, network, '10000');
  }

  public generateMnemonic () {
    return bip39.generateMnemonic();
  }

  public getSeedFromMnemonic (mnemonic) {
    return bip39.mnemonicToSeed(mnemonic);
  }

  public getPrivKeyFromSeed (seed) {
    const root = hdkey.fromMasterSeed(seed);
    // Get first eth wallet from HDwallet
    // eslint-disable-next-line
    const addrNode = root.derive("m/44'/60'/0'/0/0");

    return {
      priv: ethUtil.bufferToHex(addrNode.privateKey),
      privHex: addrNode.privateKey
    };
  }

  public getEthereumAddress (privKey) {
    const addressHex = ethUtil.privateToAddress(privKey);
    return ethUtil.bufferToHex(addressHex);
  }

  public getPublic (privKey) {
    return ethUtil.privateToPublic(privKey);
  }

  public signEthTx ({ privKey, amount, from, to }) {
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

  public signRawTx (data, privKey) {
    const tx = new ethTx(data);
    tx.sign(privKey);
    const txSerialized = '0x' + tx.serialize().toString('hex');
    return txSerialized;
  }

  public sendERC20Tx (privKey, amount, tokenAbi, tokenAddress, receiverAddress) {
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

  public getTransactions (address) {
    return new Promise((res, rej) => {
      this.etherApi.account
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
