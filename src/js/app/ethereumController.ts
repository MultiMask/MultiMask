import networks from './../blockchain';
import EtherApi from 'etherscan-api';
import Web3 = require('web3');
const web3 = new Web3();

import { AccessController } from './accessController';
import { MessageController } from './messageController';
import { AccountController } from './account/accountController';
import { TransactionController } from './transactionController';

import { ETH_APPROVE_TX, ETH_GET_ACCOUNTS, ETH_SIGN_TX } from './../constants/blockchains/eth';

const etherApi = EtherApi.init(etherscanApiKey, 'ropsten', '3000');

export class EthereumController {
	private accessController: AccessController;
	private messageController: MessageController;
	private accountController: AccountController;
	private transactionController: TransactionController;

	constructor(opts) {
		this.accessController = opts.accessController;
		this.messageController = opts.messageController;
		this.accountController = opts.accountController;
		this.transactionController = opts.transactionController;
		
		this.startListening();
	}
	
	/**
   * Messaging
   */
	private startListening() {
		this.messageController.on(ETH_GET_ACCOUNTS, this.responseGetAccounts);
		this.messageController.on(ETH_APPROVE_TX, this.responseApproveTx);
		this.messageController.on(ETH_SIGN_TX, this.responseSignTx);
	}
	
	/**
   * Return Eth address list
   */
	private responseGetAccounts = sendResponse => {
		sendResponse(this.getEthAcounts().map(account => account.getAddress()));
	}

	/**
   * Filter all account by blockchain
   */
	private getEthAcounts() {
		return this.accountController.getAccounts().filter(account => {
			return account.blockchain === networks.ETH.sign;
		});
	}
	
	/**
   * Return account by address
   * @param address 
   */
	private getAccount(address) {
		return this.getEthAcounts().find(acc => acc.getAddress() === address);
	}

	/**
   * Enhance TX and send to
   * @param data 
   */
	private responseApproveTx = (sendResponse, data) => {
		const preparedData = {
			blockchain: networks.ETH.sign,
			tx: data
		};
		const richData = this.appreveTX(preparedData);
		
		this.transactionController.ApproveTX(richData)
			.then(data => {
				sendResponse({
					payload: data
				});
			})
		// };
	}
	
	private appreveTX(data) {
		const account = this.getAccount(data.tx.from);

		return {
			...data,
			tx: {
				...data.tx,
				// Default params
				gasLimit: web3.utils.toHex(web3.utils.toBN('21000')),
				gasPrice: web3.utils.toHex(web3.utils.toWei('1', 'gwei')),
				nonce: web3.utils.toHex(account.wallet.getNextNonce().toString())
			}
		}
	}
	
	/**
   * Response with signed TX
   */
	private responseSignTx = (sendResponse, tx) => {
		const account = this.getAccount(tx.from);

		if (account) {
			account.wallet.updateNonce();
			sendResponse(account.wallet.signRawTx(tx));
		} else {
			sendResponse(null);
		}
	}
}
