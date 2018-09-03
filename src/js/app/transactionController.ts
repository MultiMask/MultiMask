import uuid from 'uuid/v4';
import windowCtrl from './../libs/txWindow';

import { AccessController } from './accessController';
import { MessageController } from './messageController';

import { AccountController } from './account/accountController';

import { TX_APPROVE, TX_PAYMENT_GET } from './../constants/tx';

const txs: TXModel[] = [];

export class TransactionController {
  private accessController: AccessController;
  private messageController: MessageController;
  private accountController: AccountController;

  constructor(opts) {
    this.accessController = opts.accessController;
    this.messageController = opts.messageController;
    this.accountController = opts.accountController;

    this.startListening();
  }

  private startListening() {
    this.messageController.on(TX_APPROVE, this.txToApprove);
    this.messageController.on(TX_PAYMENT_GET, this.getLastTx);
  }

  private txToApprove = (sendResponse, data) => {
    return new Promise((res, rej) => {
      const tx = new TXModel(data, uuid(), res);

      txs.push(tx);
      windowCtrl({});
    });
  }

  private getLastTx = (sendResponse) => {
    if (txs.length > 0) {
      const tx = txs[txs.length - 1];
      
      sendResponse(tx.toJSON())
    }

    return null;
  }
}

export class TXModel {
  public data;
  public id;
  public resolver;

  constructor(data, id, resolver) {
    this.data = data;
    this.id = id;
    this.resolver = resolver;
  }

  updateTX(data) {
    this.data.tx = {
      ...this.data.tx,
      ...data
    };

    return this;
  }

  toJSON() {
    return {
      data: this.data,
      id: this.id
    };
  }

  resolve() {
    this.resolver(this.data.tx);

    return this;
  }
}

const find = id => {
  for (let i = txs.length - 1; i >= 0; i--) {
    if (txs[i].id == id) {
      return txs[i];
    }
  }
};
