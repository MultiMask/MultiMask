import ntx from 'bcnetwork';

import { AccessController } from '../accessController';
import { MessageController } from '../messageController';
import { AccountController } from '../account/accountController';

import { REQUEST_SIGNATURE } from 'constants/blockchains/eos';
import { SIGNATURE } from 'constants/promptTypes';

import {Prompt} from 'models/Prompt';
import {NotificationService} from 'services/NotificationService';

import { EosEngine } from './engine';

export class EosController {
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
    this.messageController.on(REQUEST_SIGNATURE, this.responseRequestSignature);
  }
  
  /**
   * When need to sign transaction
   */
  private responseRequestSignature = (sendResponse, data) => {
    const requiredAccounts = EosEngine.actionParticipants(data);
    const requiredAccount = requiredAccounts ? requiredAccounts[0].split('@')[0] : null;

    // TODO: check network

    const account = this.findByAccountName(requiredAccount);
    if (account) {
      const responder = approval => {
        const signature = approval.success 
          ? EosEngine.sign(data, account.getSeed())
          : null
        
        sendResponse({
          signatures:[signature],
          success: approval.success
        })
      }

      NotificationService.open(new Prompt(SIGNATURE, { data, responder }));
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
