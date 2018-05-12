import {
  ACCOUNT_INFO,
  ACCOUNT_INFO_RESULT,
  ACCOUNT_CREATE
} from "../../constants/account";

export default ({ messaging, App }) => {
  // Get Account
  messaging.on(ACCOUNT_CREATE, account => {
    App.addAccount(account);
  });

  // Get Wallet info
  messaging.on(ACCOUNT_INFO, () => {
    Promise.all(App.getAccounts().map(acc => acc.getInfo())).then(payload => {
      messaging.send({
        type: ACCOUNT_INFO_RESULT,
        payload
      });
    });
  });

  // Is has wallet
  // messaging.on("has_wallet", () => {
  //     wallet.isHasWallet().then(res => {
  //         messaging.send({
  //             type: "has_wallet_result",
  //             payload: res
  //         });
  //     });
  // });

  // // Create wallet
  // messaging.on("wallet_create", payload => {
  //     wallet.create(payload.pass);

  //     messaging.send({
  //         type: "wallet_create_success"
  //     });
  // });

  // // Auth wallet
  // messaging.on("wallet_auth", payload => {
  //     messaging.send({
  //         type: "wallet_auth_result",
  //         payload: wallet.auth(payload.pass)
  //     });
  // });
};
