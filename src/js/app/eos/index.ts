import ntx from 'bcnetwork';

import { AccessController } from '../accessController';
import { MessageController } from '../messageController';
import { AccountController } from '../account/accountController';
import { TransactionController } from '../transactionController';

import { REQUEST_SIGNATURE } from 'constants/blockchains/eos';

import { EosEngine } from './engine';

export class EosController {
  private accessController: AccessController;
  private messageController: MessageController;
  private accountController: AccountController;
  private transactionController: TransactionController;

  constructor (opts) {
    this.accessController = opts.accessController;
    this.messageController = opts.messageController;
    this.accountController = opts.accountController;
    this.transactionController = opts.transactionController;
    
    this.startListening();
  }
  
  /**
   * Messaging
   */
  private startListening () {
    this.messageController.on(REQUEST_SIGNATURE, this.responseRequestSignature);
  }
  
  /**
   * When need to sign transaction
   */
  private responseRequestSignature = (sendResponse, payload) => {
    const requiredAccounts = EosEngine.actionParticipants(payload);
    const requiredAccount = requiredAccounts ? requiredAccounts[0].split('@')[0] : null;

    // TODO: check network

    const account = this.findByAccountName(requiredAccount);
    if (account) {
      const signature = EosEngine.sign(payload, account.getSeed());
      
      sendResponse({
        signatures:[signature]
      })
    }
  }

  /**
   * Find required account by account_name
   * @param name 
   */
  private findByAccountName (name: string) {
    return this.accountController.getByAddress(name);
  }
}
