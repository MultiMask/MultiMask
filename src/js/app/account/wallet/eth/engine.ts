import Web3 = require('web3');
import ethTx = require('ethereumjs-tx');
import { isString } from 'lodash';

import * as ethUtil from 'ethereumjs-util';
import { isHexString } from 'helpers/func';

import EtherApi from 'etherscan-api';
import { BIP32 } from 'bip32';

const web3 = new Web3();

export default class Engine {
  public etherApi: any;

  constructor (network) {
    this.etherApi = EtherApi.init(etherscanApiKey, network, '10000');
  }

  public getPrivKeyFromSeed (pk: BIP32 | string) {
    if (isString(pk)) {
      const rightPk = isHexString(pk) ? pk : `0x${pk}`;

      return {
        address: this.getEthereumAddress(rightPk),
        privateKey: Buffer.from(rightPk, 'hex'),
      }
    } else {
      const pkHex = ethUtil.bufferToHex(pk.privateKey);

      return {
        address: this.getEthereumAddress(pkHex),
        privateKey: pk
      }
    }
  }

  public getEthereumAddress (privKey) {
    const addressHex = ethUtil.privateToAddress(privKey);
    return ethUtil.bufferToHex(addressHex);
  }

  public getPublic (privKey) {
    return ethUtil.privateToPublic(privKey);
  }

  public signEthTx ({ privKey, amount, from, to, nonce }) {
    const tx = new ethTx({
      to,
      from,
      value: web3.utils.toHex(web3.utils.toBN(amount)),
      gasLimit: web3.utils.toHex(web3.utils.toBN('21000')),
      gasPrice: web3.utils.toHex(web3.utils.toWei('5', 'gwei')),
      nonce: web3.utils.toHex(nonce)
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
