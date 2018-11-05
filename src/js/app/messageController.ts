import { LocalStream } from 'extension-streams';
import { info } from 'loglevel';
import EventEmitter = require('events');

import { BusController } from 'app/busController';
import { DomainController } from 'app/domainController';
import InternalMessage from 'services/InternalMessage';
import { NotificationService } from 'services/NotificationService';
import { Prompt } from 'models/Prompt';
import { NOAUTH } from 'constants/promptTypes';

import { CHECKER_IS_AUTH } from 'constants/auth';
import { CHECK_IS_READY, SET_CURRENT_DOMAIN } from 'constants/appInternal';

type AuthCheckFn = (isReady: boolean) => void;

interface IMessageType {
  type: string;
  from?: string;
  payload: any;
  domain: string;
}

/**
 * Receive message from site, popup and dialog
 */
export class MessageController extends EventEmitter {
  private busController: BusController;
  private domainController: DomainController;

  constructor (opts) {
    super();
    
    this.busController = opts.busController;
    this.domainController = opts.domainController;

    this.listening();
  }

  public listening () {
    LocalStream.watch((request: IMessageType, sendResponse) => {
      const message = InternalMessage.fromJson(request);
      const payload = message.payload ? message.payload : message;
      payload.type = message.type;

      // logs
      info('received << ', payload);

      const cb = (...args) => {
        info('responsed >> ', ...args, request);
        sendResponse(...args);
      }

      // Set current open domain
      if (payload.domain) {
        this.busController.emit(SET_CURRENT_DOMAIN, payload.domain);
      }

      // Miss sync messages
      if (payload.type === 'sync') {
        return;
      }

      // untrusted source (site)
      if (payload.from) {
        info('untrusted sourse');
        if (!payload.domain) {
          throw new Error('In content query must be attached domain');
        }

        this.checkAuth(payload.type, isReady => {
          if (isReady) {
            console.log('check domain');
            this.domainController.checkDomain(payload.domain)
              .then(result => {
                console.log('approve > ', result);
                this.emit(payload.type, cb, payload.payload);
                // console.log('domain check result > ', result);
              })
              .catch(error => { 
                sendResponse({ error, type: 'error' });
              })
          } else {
            this.showNoAuthPrompt();
            sendResponse({ error: 'No auth ', type: 'error' });
          }
        });

      // msg from trusted source 
      } else if (!message.from) {
        info('trusted sourse');
        this.checkAuth(payload.type, isReady => {
          if (isReady) {
            this.emit(message.type, cb, message.payload);
          }
        });
      }

    });
  }

  private checkAuth (type: string, cb: AuthCheckFn) {
    // If is auth query
    if (CHECKER_IS_AUTH.test(type)) {
      cb(true)
    }

    this.busController.emit(CHECK_IS_READY, isReady => cb(isReady));
  }

  private showNoAuthPrompt () {
    NotificationService.open(new Prompt(NOAUTH));
  }
}
