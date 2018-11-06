import ntx from 'bcnetwork';
import Web3 = require('web3');
const web3 = new Web3();

import { NotificationService } from 'services/NotificationService';
import { Prompt } from 'models/Prompt';
import { APPROVAL } from 'constants/promptTypes';

import { AccessController } from './accessController';
import { MessageController } from './messageController';
import { AccountController } from './account/accountController';

import { ETH_APPROVE_TX, ETH_GET_ACCOUNTS, ETH_SIGN_TX } from 'constants/blockchains/eth';

export class EthereumController {
  private accessController: AccessController;
  private messageController: MessageController;
  private accountController: AccountController;

  constructor (opts) {
    this.accessController = opts.accessController;
    this.messageController = opts.messageController;
    this.accountController = opts.accountController;
    
    this.startListening();
  }
  
  /**
   * Messaging
   */
  private startListening () {
    this.messageController.on(ETH_GET_ACCOUNTS, this.responseGetAccounts);
    this.messageController.on(ETH_APPROVE_TX, this.responseApproveTx);
    this.messageController.on(ETH_SIGN_TX, this.responseSignTx);
  }
  
  /**
   * Return Eth address list
   */
  private responseGetAccounts = (sendResponse, data, { domain }) => {
    sendResponse(this.getEthAcounts(domain).map(account => account.getAddress()));
  }

  /**
   * Filter all account by blockchain
   */
  private getEthAcounts (domain?: string) {
    return this.accountController.getAccounts({
      bc: ntx.ETH.sign,
      domain
    });
  }
  
  /**
   * Return account by address
   * @param address 
   */
  private getAccount (address) {
    return this.getEthAcounts().find(acc => acc.getAddress() === address);
  }

  /**
   * Enhance TX and send to
   * @param data 
   */
  private responseApproveTx = (sendResponse, payload) => {
    const data = this.addDefaultsPropsToTx({
      blockchain: ntx.ETH.sign,
      tx: payload
    });
    const responder = approval => {
      if(approval && approval.tx) {
        sendResponse({
          payload: approval.tx
        });
      }
    }

    NotificationService.open(new Prompt(APPROVAL, { data, responder }));
  }
  
  /**
   * Enrich txdata by defaults params
   * @param data 
   */
  private addDefaultsPropsToTx (data) {
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
