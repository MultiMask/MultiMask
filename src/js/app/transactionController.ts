import uuid from 'uuid/v4';

import { TX_SEND } from 'constants/tx';

import { AccessController } from './accessController';
import { MessageController } from './messageController';

import { AccountController } from './account/accountController';


export class TransactionController {
  private accessController: AccessController;
  private messageController: MessageController;
  private accountController: AccountController;

  constructor (opts) {
    this.accessController = opts.accessController;
    this.messageController = opts.messageController;
    this.accountController = opts.accountController;

    this.startListening();
  }

  private startListening () {
    this.messageController.on(TX_SEND, this.responseSendTx);
  }
  
  /**
   * Send TX via popup
   */
  private responseSendTx = (sendResponse, { id, tx }) => {
    const account = this.accountController.getById(id);
    
    account.sendTX(tx).then(txHash => {
      sendResponse({
        result: 'success',
        txHash
      })
    })
    .catch(error => {
      sendResponse({
        result: 'error',
        error
      })
    })
  }
}
