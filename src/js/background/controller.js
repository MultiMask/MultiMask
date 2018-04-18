import wallet from "../models/wallet";
import messaging from "./message";
import listeners from './listeners';
import App from './../models/app';

class Controller {
  init() {
    console.log("init ctrl", messaging);

    wallet.init();
    messaging.init();

    listeners({ messaging, wallet, App });
  }
}

const controller = new Controller();
export default controller;
