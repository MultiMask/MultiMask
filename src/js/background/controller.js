import messaging from './message';
import listeners from './listeners';
import App from './../models/app';
import log from 'loglevel';

class Controller {
  init() {
    // eslint-disable-next-line
    log.setLevel(logLevel);

    messaging.init();
    listeners({ messaging, App });
  }
}

const controller = new Controller();
export default controller;
