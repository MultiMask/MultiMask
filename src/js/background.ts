// import { LocalStream } from 'extension-streams';
import { setLevel } from 'loglevel';

import { AccessController } from './app/accessController';
import { MessageController } from './app/messageController';

import { ProfileListController } from './app/profiles/profileListController';

// import listeners from './background/listeners';
// import App from './models/app';

class Controller {
  private accessController: AccessController;
  private messageController: MessageController;
  private profileListController: ProfileListController;

  constructor() {
    // Set from settings in ./config.json
    setLevel(logLevel);

    // App.bootstrap();
    // this.setupInternalMessaging({ App });

    this.messageController = new MessageController();

    this.accessController = new AccessController({
      messageController: this.messageController
    });

    this.profileListController = new ProfileListController({
      messageController: this.messageController,
      accessController: this.accessController
    });
  }

  // setupInternalMessaging(opts) {
  //   const watcher = listeners(opts);

  //   LocalStream.watch(watcher);
  // }
}

new Controller();
