import createWindow from "../libs/txWindow";
import wallet from "../models/wallet";
import storage from "../models/storage";
import messaging from "./message";

class Controller {
  constructor() {
    this.tx = [];
  }

  init() {
    console.log("init ctrl");

    wallet.init();
    // wallet.testTX();
    // wallet.setPK();
    messaging.init();
    this.adddListeners();

    chrome.storage.local.set({ "res": "done" }, function () {
      console.log('save')
    });

    chrome.storage.local.get("res", function (result) {
      console.log(result);
    });
  }

  adddListeners() {
    // Show window with TX
    messaging.on("tx_send", data => {
      this.tx.push({
        ...data,
        id: this.tx.length
      });

      console.log(this.tx);
      createWindow({});
    });

    // Show window with TX
    messaging.on("tx_create", data => {
      this.tx.push({
        id: this.tx.length,
        isNew: true
      });

      console.log(this.tx);
      createWindow({});
    });

    // Render TX in popup
    messaging.on("payment_init", data => {
      messaging.send({
        type: "payment_tx",
        payload: this.tx[this.tx.length - 1]
      });
    });

    // Render TX in popup
    messaging.on("payment_submit", payload => {
      const { id } = payload;
      this.tx[id] = {
        ...this.tx[id],
        ...payload
      };
      wallet.createTX(this.tx[id]);
    });

    // Is has wallet
    messaging.on("has_wallet", () => {
      wallet.isHasWallet().then(res => {
        messaging.send({
          type: "has_wallet_result",
          payload: res
        });
      });
    });

    // Create wallet
    messaging.on("wallet_create", payload => {
      wallet.create(payload.pass);

      messaging.send({
        type: "wallet_create_success"
      });
    });

    // Auth wallet
    messaging.on("wallet_auth", payload => {
      messaging.send({
        type: "wallet_auth_result",
        payload: wallet.auth(payload.pass)
      });
    });

    // GetWallet info
    messaging.on("wallet_info", () => {
      wallet.getInfo().then(data => {
        messaging.send({
          type: "wallet_info_result",
          payload: data
        });
      })
    });
  }
}

const controller = new Controller();
export default controller;
