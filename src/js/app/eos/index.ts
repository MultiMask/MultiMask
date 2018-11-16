import { BusController } from 'app/busController';
import { MessageController } from 'app/messageController';
import { AccountController } from 'app/account/accountController';

import { REQUEST_SIGNATURE, GET_KEY_ACCOUNTS, SET_ACCOUNT_TO_KEY } from 'constants/blockchains/eos';
import { SIGNATURE } from 'constants/promptTypes';
import { ACCOUNT_UPDATE } from 'constants/account';

import {Prompt} from 'models/Prompt';
import {NotificationService} from 'services/NotificationService';
import {parseAccounts, prettyAccount} from 'helpers/eos';

import { EosEngine } from './engine';

export class EosController {
  private busController: BusController;
  private messageController: MessageController;
  private accountController: AccountController;

  constructor (opts) {
    this.busController = opts.busController;
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
          // TODO: put PrivateKey
          // ? EosEngine.sign(data, account.getSeed())
          // : null
        
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
  private responseGetKeyAccounts = (sendResponse: InternalResponseFn, { key }): void => {
    const account = this.accountController.getAccount({ key });

    if (account) {
      account.wallet.getKeyAccounts()
        .then(accounts => {
          const publicKey = account.wallet.public;

          sendResponse({
            success: true,
            payload: parseAccounts(accounts, publicKey)
          });
        })
    } else {
      sendResponse({
        success: true,
        message: 'Not found account'
      });
    }
  }

  /**
   * Assign eos account name to account
   */
  private responseSetKeyAccount = (sendResponse, {key, accountPermission}): void => {
    const account = this.accountController.getAccount({ key });

    if (account) {
      this.busController.emit(ACCOUNT_UPDATE, key, { extra: prettyAccount(accountPermission)}, () => {
        account.getInfo().then(sendResponse);  
      });
    } else {
      sendResponse(null);
    }
  }

  /**
   * Find required account by account_name
   * @param name 
   */
  private findByAccountName (address: string) {
    return this.accountController.getAccount({ address });
  }
}
