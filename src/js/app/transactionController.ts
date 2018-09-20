import uuid from 'uuid/v4';

import windowCtrl from 'libs/txWindow';
import { TXModel } from 'models/TxResolver';
import { TX_APPROVE, TX_PAYMENT_GET, TX_APPROVE_RESULT, TX_SEND } from 'constants/tx';

import { AccessController } from './accessController';
import { MessageController } from './messageController';

import { AccountController } from './account/accountController';

const txs: TXModel[] = [];
const find = id => {
  for (let i = txs.length - 1; i >= 0; i--) {
    if (txs[i].id === id) {
      return txs[i];
    }
  }
};

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
    this.messageController.on(TX_APPROVE, this.responseTxToApprove);
    this.messageController.on(TX_PAYMENT_GET, this.responseGetLastTx);
    this.messageController.on(TX_APPROVE_RESULT, this.responseConfirm);
    
    this.messageController.on(TX_SEND, this.responseSendTx);
  }

  /**
   * Create Tx to Approve and create Dialog window
   */
  private responseTxToApprove = (sendResponse, data) => {
    return new Promise((res, rej) => {
      const tx = new TXModel(data, uuid(), res);

      txs.push(tx);
      windowCtrl({});
    });
  }

  /**
   * Return last tx from TX list
   */
  private responseGetLastTx = sendResponse => {
    if (txs.length > 0) {
      const tx = txs[txs.length - 1];
      
      sendResponse(tx.toJSON())
    }

    return null;
  }

  /**
   * Confirm TX
   * @param sendResponse 
   * @param param1 
   */
  private responseConfirm = (sendResponse, { id, data }) => {
    const tx = find(id);
    if (tx) {
      tx.updateTX(data).resolve();
      
      sendResponse({});
    }
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
  
  /**
   * 
   * @param data 
   */
  public ApproveTX (data) {
    return new Promise((res, rej) => {
      const tx = new TXModel(data, uuid(), res);

      txs.push(tx);
      windowCtrl({});
    });
  }
}
