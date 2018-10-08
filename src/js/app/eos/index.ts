import AccountFactory from 'app/account/accountFactory';

import { AccessController } from '../accessController';
import { MessageController } from '../messageController';
import { AccountController } from '../account/accountController';

import { REQUEST_SIGNATURE, GET_KEY_ACCOUNTS, SET_ACCOUNT_TO_KEY } from 'constants/blockchains/eos';
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
    this.messageController.on(GET_KEY_ACCOUNTS, this.responseGetKeyAccounts);
    this.messageController.on(SET_ACCOUNT_TO_KEY, this.responseSetKeyAccount);
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
   * @param id AccountId
   */
  private responseGetKeyAccounts = (sendResponse, id: string): void => {
    const account = this.accountController.getById(id);

    if (account) {
      account.wallet.getKeyAccounts()
        .then(sendResponse)
    } else {
      sendResponse(null);
    }
  }

  /**
   * Assign eos account name to account
   */
  private responseSetKeyAccount = (sendResponse, id: string, accountName: string): void => {
    const account = this.accountController.getById(id);

    account.wallet.setExtra({account: accountName});
    AccountFactory.save(this.accessController.getPass(), account);

    account.getInfo().then(sendResponse);
  }

  /**
   * Find required account by account_name
   * @param name 
   */
  private findByAccountName (name: string) {
    return this.accountController.getByAddress(name);
  }
}
