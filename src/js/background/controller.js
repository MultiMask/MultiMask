// import wallet from "../models/wallet";
import messaging from './message';
import listeners from './listeners';
import App from './../models/app';

class Controller {
  init() {
    messaging.init();
    listeners({ messaging, App });
  }
}

const controller = new Controller();
export default controller;
