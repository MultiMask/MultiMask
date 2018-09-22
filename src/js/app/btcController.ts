import ntx from 'bcnetwork';

import { NotificationService } from 'services/NotificationService';
import { Prompt } from 'models/Prompt';
import { APPROVAL } from 'constants/promptTypes';

import { AccessController } from './accessController';
import { MessageController } from './messageController';
import { AccountController } from './account/accountController';

import { BTC_APPROVE, BTC_GET_ACCOUNTS } from 'constants/blockchains/btc';

export class BtcController {
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
    this.messageController.on(BTC_APPROVE, this.responseApproveTx);
    this.messageController.on(BTC_GET_ACCOUNTS, this.responseGetAccounts);
  }

  /**
   * Enhance TX and send to
   * @param data 
   */
  private responseApproveTx = (sendResponse, data) => {
    const account = this.accountController.getByAddress(data.tx.from);

    if (!account) {
      sendResponse({
        error: 'Account not found'
      });
    }

    const responder = approval => {
      if(approval && approval.tx) {
        
        account.sendTX(approval.tx).then(data => {
          sendResponse({
            success: true
          })
        })
      }
    }

    NotificationService.open(new Prompt(APPROVAL, { data, responder }));
  }

  /**
   * Return list of BTC wallets
   */
  private responseGetAccounts = (sendReponse) => {
    const accounts = this.accountController.getAccountsBySign(ntx.BTC.sign);

    sendReponse(accounts.map(acc => acc.getAddress()));
  }
}
