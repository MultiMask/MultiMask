import {
  ACCOUNT_INFO,
  ACCOUNT_INFO_RESULT,
  ACCOUNT_CREATE,
  ACCOUNT_ACTIVE
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