import { LocalStream } from 'extension-streams';
import { info } from 'loglevel';
import EventEmitter = require('events');
import { CONTENT_APP } from 'constants/apps';

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
  constructor () {
    super();

    // TODO: Add check for phishing
    LocalStream.watch((msg: IMessageType, sendResponse) => {
      // logs
      const cb = (...args) => {
        info('background responsed > ', ...args, msg);
        sendResponse(...args);
      }
      info('background received > ', msg);

      if (msg.from === CONTENT_APP && !msg.domain) {
        throw new Error('In content query must be attached domain');
      }

      this.emit(msg.type, cb, msg.payload);
    });
  }
}
