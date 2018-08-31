import { LocalStream } from 'extension-streams';
import { setLevel } from 'loglevel';

import listeners from './background/listeners';
import App from './models/app';

class Controller {
  constructor() {
    setLevel(logLevel);

    App.bootstrap();
    this.setupInternalMessaging({ App });
  }

  setupInternalMessaging(opts) {
    const watcher = listeners(opts);

    LocalStream.watch(watcher);
  }
}

new Controller();
