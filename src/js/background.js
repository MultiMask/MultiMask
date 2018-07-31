import 'babel-core/register';
import 'babel-polyfill';
import { LocalStream } from 'extension-streams';
import log from 'loglevel';

import messaging from './background/message';
import listeners from './background/listeners';
import App from './models/app';
import InternalMessage from './libs/InternalMessage';

class Controller {
  constructor() {
    // eslint-disable-next-line
    log.setLevel(logLevel);

    this.setupInternalMessaging();

    messaging.init();
    listeners({ messaging, App });
  }

  setupInternalMessaging() {
    LocalStream.watch((request, sendResponse) => {
      console.log(request, sendResponse);
    });
  }
}

new Controller();
