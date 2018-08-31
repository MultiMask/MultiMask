// import { LocalStream } from 'extension-streams';
import { setLevel } from 'loglevel';

import { AccessController } from './background/accessController';
import { MessageController } from './background/messageController';

// import listeners from './background/listeners';
// import App from './models/app';

class Controller {
  private accessController: AccessController;
  private messageController: MessageController;

  constructor() {
    // Set from settings in ./config.json
    setLevel(logLevel);

    // App.bootstrap();
    // this.setupInternalMessaging({ App });

    this.messageController = new MessageController();

    this.accessController = new AccessController({
      messageController: this.messageController
    });
  }

  // setupInternalMessaging(opts) {
  //   const watcher = listeners(opts);

  //   LocalStream.watch(watcher);
  // }
}

new Controller();
