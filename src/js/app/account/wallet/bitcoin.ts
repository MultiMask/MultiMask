import * as bitcoin from 'bitcoinjs-lib';
import Mnemonic from 'bitcore-mnemonic';
import axios from 'axios';

import { info } from 'loglevel';

const URL_NODE = 'https://testnet.blockchain.info';
// const NETWORK = 'testnet';
// const NETWORK = "livenet";

export default class BitcoinWallet {
	public network: any;
	public priv: any;
	public address: any;

	constructor(network) {
		this.network = network;
	}

	public create(seed) {
		const mnemonic = new Mnemonic(seed);
	
		const HDPrivateKey = mnemonic.toHDPrivateKey(null, this.network);
	
		this.priv = HDPrivateKey.privateKey.toWIF();
		this.address = HDPrivateKey.privateKey.toAddress(this.network).toString();

		return mnemonic.toString();
	}

	public changeNetwork(network: string, seed: string) {
		this.network = network

		const mnemonic = new Mnemonic(seed);
	
		const HDPrivateKey = mnemonic.toHDPrivateKey(null, this.network);
	
		this.priv = HDPrivateKey.privateKey.toWIF();
		this.address = HDPrivateKey.privateKey.toAddress(this.network).toString();
	}
	
	public getAddress() {
		return this.address;
	}

	public getInfo() {
		return axios.get(`${URL_NODE}/rawaddr/${this.address}`).then(res => {
			const lastOUT = res.data.txs[0];
			const output = lastOUT ? lastOUT.hash : null;
			const outputIndex = lastOUT && lastOUT.out ? lastOUT.out.findIndex(item => item.addr === this.address) : null;

			return {
				index: outputIndex,
				address: res.data.address,
				output,
				balance: res.data.final_balance / 1e8,
				network: this.network,
				txs: res.data.txs
			};
		});
	}

	public createTX({ to, amount, data }) {
		return this.getInfo().then(({ output, balance, index }) => {
			const privateKey = this.priv;
			const address = this.address;
			// SEND signed Tx
			info('create TX with: ');
			info('to: ', to);
			info('amount: ', amount);
			info('data: ', data);
			info('output: ', output);
			// console.log('balance: ', balance);

			const amountInSatoshi = amount * 1e8;
			const SUM = balance * 1e8;
			info('balance:', SUM);

			const testnet = bitcoin.networks.testnet;
			const txb = new bitcoin.TransactionBuilder(testnet);
			const keyPair = bitcoin.ECPair.fromWIF(privateKey, testnet);

			txb.addInput(output, index);

			if (data) {
				const bitcoin_payload = Buffer.from(data, 'utf8');
				const dataScript = bitcoin.script.nullData.output.encode(bitcoin_payload);

				txb.addOutput(dataScript, 0);
			}

			const amountToReturn = SUM - amountInSatoshi - 5000;

			txb.addOutput(to, amountInSatoshi);
			txb.addOutput(address, +amountToReturn.toFixed(0));

			txb.sign(0, keyPair);

			info('TX = ', txb.build().toHex());

			return axios.post(`${URL_NODE}/pushtx`, 'tx=' + txb.build().toHex()).then(hash => {
				info('TX hash:', hash);

				return { hash };
			});
		});
	}
}
