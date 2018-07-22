import Web3 from 'web3';
import ethUtil from 'ethereumjs-util';
import bip39 from 'bip39';
import ethTx from 'ethereumjs-tx';
import hdkey from 'hdkey';

import EtherApi from 'etherscan-api';

// eslint-disable-next-line
const etherApi = EtherApi.init(etherscanApiKey, 'ropsten', '3000');

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
      value: Web3.utils.toHex(Web3.utils.toBN(amount)),
      gasLimit: Web3.utils.toHex(Web3.utils.toBN('21000')),
      gasPrice: Web3.utils.toHex(Web3.utils.toWei('1', 'gwei')),
      nonce: Web3.utils.toHex(0)
    });
    tx.sign(privKey);
    const txSerialized = '0x' + tx.serialize().toString('hex');
    return txSerialized;
  }

  sendERC20Tx(privKey, amount, tokenAbi, tokenAddress, receiverAddress) {
    const senderAddress = this.getEthereumAddress(privKey);
    const contract = new Web3.eth.Contract(tokenAbi, tokenAddress);
    const bytecode = contract.methods.transfer(receiverAddress, amount).encodeABI();
    const tx = new ethTx({
      to: tokenAddress,
      from: senderAddress,
      value: Web3.utils.toHex(amount),
      gasLimit: Web3.utils.toHex(Web3.utils.toBN('75000')),
      gasPrice: Web3.utils.toHex(Web3.utils.toWei('1', 'gwei')),
      nonce: Web3.utils.toHex(0),
      data: bytecode
    });
    tx.sign(privKey);
    const txSerialized = '0x' + tx.serialize().toString('hex');
    return txSerialized;
  }

  getTransactions(address) {
    return etherApi.account.txlist(address, 0, 9999999999999, 'asc');
  }
}
