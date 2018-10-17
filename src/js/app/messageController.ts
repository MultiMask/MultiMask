import { LocalStream } from 'extension-streams';
import { info } from 'loglevel';
import EventEmitter = require('events');

import { BusController } from 'app/busController';
import { DomainController } from 'app/domainController';
import InternalMessage from 'services/InternalMessage';

import { CHECKER_IS_AUTH } from 'constants/auth';
import { CHECK_IS_READY } from 'constants/appInternal';

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
            this.domainController.checkDomain(payload.domain)
              .then(result => {
                console.log('domain check result > ', result);
              })
          } else {
            this.showNoAuthPrompt();
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
    console.log('show prompt');
  }
}
