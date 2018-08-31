import { LocalStream } from 'extension-streams';
import { info } from 'loglevel';
import EventEmitter = require('events');

type MessageType = {
  type: string;
  payload: any;
}

/**
 * Receive message from site, popup and dialog
 */
export class MessageController extends EventEmitter {
  constructor() {
    super();

    // TODO: Add check for phishing
    LocalStream.watch((msg: MessageType, sendResponse) => {
      // logs
      const cb = (...args) => {
        info('background responsed > ', ...args, msg);
        sendResponse(...args);
      }
      info('background received > ', msg);

      this.emit(msg.type, cb, msg.payload);
    });
  }
}
