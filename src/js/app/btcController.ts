import ntx from 'bcnetwork';

import { Prompt } from 'models/Prompt';
import { APPROVAL } from 'constants/promptTypes';
import { BTC_APPROVE, BTC_GET_ACCOUNTS } from 'constants/blockchains/btc';
import { NotificationService } from 'services/NotificationService';

import { AccessController } from './accessController';
import { MessageController } from './messageController';
import { AccountController } from './account/accountController';

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
  private responseApproveTx = (sendResponse: InternalResponseFn, data) => {
    const account = this.accountController.getAccount({ address: data.tx.from });

    if (!account) {
      sendResponse({
        success: false,
        error: 'Account not found'
      });
    }

    const responder = approval => {
      if(approval && approval.tx) {
        
        account.sendTX(approval.tx).then(TxHash => {
          sendResponse({
            success: true,
            payload: {
              TxHash
            }
          })
        })
      }
    }

    NotificationService.open(new Prompt(APPROVAL, { data, responder }));
  }

  /**
   * Return list of BTC wallets
   */
  private responseGetAccounts = (sendReponse, req, domain) => {
    console.log('req > ', req, domain);
    const accounts = this.accountController.getAccounts({ bc: ntx.BTC.sign });

    sendReponse(accounts.map(acc => acc.getAddress()));
  }
}
