import 'babel-core/register';
import 'babel-polyfill';

import { LocalStream } from 'extension-streams';
import log from 'loglevel';

import listeners from './background/listeners';
import App from './models/app';

class Controller {
  constructor() {
    // eslint-disable-next-line
    log.setLevel(logLevel);

    this.setupInternalMessaging({ App });
  }

  setupInternalMessaging(opts) {
    const watcher = listeners(opts);

    LocalStream.watch(watcher);
  }
}

new Controller();
