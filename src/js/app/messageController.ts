import { LocalStream } from 'extension-streams';
import InternalMessage from 'services/InternalMessage';
import { info } from 'loglevel';
import EventEmitter = require('events');

import { DomainController } from 'app/domainController';

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
  private domainController: DomainController;

  constructor (opts) {
    super();
    this.domainController = opts.domainController;

    this.listening();
  }

  public listening () {
    LocalStream.watch((request: IMessageType, sendResponse) => {
      const message = InternalMessage.fromJson(request);
      const payload = message.payload ? message.payload : message;

      // logs
      info('received << ', message);
      info('received << ', payload);

      const cb = (...args) => {
        info('responsed >> ', ...args, request);
        sendResponse(...args);
      }

      if (payload.from) {
        // msg from untrusted source (site)
        info('untrusted sourse');
        if (!payload.domain) {
          throw new Error('In content query must be attached domain');
        }

        this.domainController.checkDomain(payload.domain)
          .then(result => {
            console.log('domain check result > ', result);
          })
      } else if (!message.from) {
        // msg from trusted source 
        info('trusted sourse');
        this.emit(message.type, cb, message.payload);
      }
    });
  }
}
