import Eos from 'eosjs'
const {ecc} = Eos.modules;

import { BusController } from 'app/busController';
import { MessageController } from 'app/messageController';
import { AccountController } from 'app/account/accountController';

import { REQUEST_SIGNATURE, GET_KEY_ACCOUNTS, SET_ACCOUNT_TO_KEY, EOS_GET_ACCOUNTS } from 'constants/blockchains/eos';
import { SIGNATURE } from 'constants/promptTypes';
import { ACCOUNT_UPDATE } from 'constants/account';

import {Prompt} from 'models/Prompt';
import {NotificationService} from 'services/NotificationService';
import {parseAccounts, prettyAccount, parsePrettyAccount, actionParticipants} from 'helpers/eos';

import { BCSign } from 'bcnetwork';

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
    this.messageController.on(SET_ACCOUNT_TO_KEY, this.responseSetKeyAccount);
    this.messageController.on(GET_KEY_ACCOUNTS, this.responseGetKeyAccounts);

    // plugin
    this.messageController.on(REQUEST_SIGNATURE, this.responseRequestSignature);
    this.messageController.on(EOS_GET_ACCOUNTS, this.responseGetAccounts);
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
   * When need to sign transaction
   */
  private responseRequestSignature = (sendResponse, data) => {
    const requiredAccounts = actionParticipants(data);
    const requiredAccount = requiredAccounts ? requiredAccounts[0].split('@')[0] : null;

    // TODO: check network

    const account = this.findByAccountName(requiredAccount);
    // console.log(account);
    if (account) {
      const responder = approval => {
        const signature = approval.success 
          ? this.sign(data, account.wallet.private)
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
   * Return allowed accounts
   */
  private responseGetAccounts = (sendResponse, { chainId }, { domain }) => {
    const accountsInstance = this.accountController.getAccounts({ bc: BCSign.EOS, chainId, domain });
    const accounts = accountsInstance
      .map(acc => {
        const idenity = parsePrettyAccount(acc.extra);

        return {
          authority: idenity[1],
          name: idenity[0],
          publicKey: acc.wallet.public,
          chainId: acc.network.chainId
        }
      })
      
    sendResponse({
      accounts
    });
  }

  /**
   * Find required account by account_name
   * @param name 
   */
  private findByAccountName (address: string) {
    return this.accountController.getAccount({ address });
  }

  private sign (payload, privateKey) {
    return ecc.sign(Buffer.from( payload.buf.data, 'utf8'), privateKey);
  }
}
