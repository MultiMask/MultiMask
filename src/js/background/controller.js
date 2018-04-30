// import wallet from "../models/wallet";
import messaging from "./message";
import listeners from './listeners';
import App from './../models/app';

class Controller {
  init() {
    // console.log("init ctrl", App);

    // Remove all accounts;
    // App.clearList();

    messaging.init();
    App.init();
    // wallet.init();

    listeners({ messaging, App });
  }
}

const controller = new Controller();
export default controller;
