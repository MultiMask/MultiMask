import {
  ACCOUNT_INFO,
  ACCOUNT_INFO_RESULT,
  ACCOUNT_CREATE,
  ACCOUNT_GETSEED,
  ACCOUNT_GETSEED_RESULT
} from '../../constants/account';

export default ({ App }) => async ({ type, payload }, sendResponse) => {
  switch (type) {
    case ACCOUNT_INFO: {
      sendAccountsInfo(App, sendResponse);
      break;
    }

    case ACCOUNT_CREATE: {
      App.io.accounts.addAccount(payload.account).then(() => {
        sendAccountsInfo(App, sendResponse);
      });

      break;
    }

    case ACCOUNT_GETSEED: {
      const { hashPass, id } = payload;
      if (await App.check(hashPass)) {
        const seed = App.io.accounts.getSeed({ id });

        if (seed) {
          sendResponse({
            type: ACCOUNT_GETSEED_RESULT,
            payload: { seed }
          });
        }
      }
      break;
    }
  }
};

// TODO: think about more logical get accounts
const sendAccountsInfo = (App, sendResponse) => {
  getAccountsInfo(App).then(payload => {
    sendResponse({
      type: ACCOUNT_INFO_RESULT,
      payload
    });
  });
};
const getAccountsInfo = App => Promise.all(App.io.accounts.getAccounts().map(acc => acc.getInfo()));
