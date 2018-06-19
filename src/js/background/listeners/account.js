import {
  ACCOUNT_INFO,
  ACCOUNT_INFO_RESULT,
  ACCOUNT_CREATE,
  ACCOUNT_GETSEED,
  ACCOUNT_GETSEED_RESULT
} from "../../constants/account";

export default ({ messaging, App }) => {
  // Get Account
  messaging.on(ACCOUNT_CREATE, account => {
    App.addAccount(account);
    sendAccountsInfo(App, messaging);
  });

  // Get Wallet info
  messaging.on(ACCOUNT_INFO, () => {
    sendAccountsInfo(App, messaging);
  });

  // Get Seed to show on front
  messaging.on(ACCOUNT_GETSEED, ({ pass, name }) => {
    const rawWallet = App.getSeed({ pass, name });

    if (rawWallet) {
      const seed = rawWallet.wallet.seed;

      messaging.send({
        type: ACCOUNT_GETSEED_RESULT,
        payload: { seed }
      });
    }
  });
};

const getAccountsInfo = App => Promise.all(App.getAccounts().map(acc => acc.getInfo()));
const sendAccountsInfo = (App, messaging) => {
  getAccountsInfo(App).then(payload => {
    messaging.send({
      type: ACCOUNT_INFO_RESULT,
      payload
    });
  });
}
