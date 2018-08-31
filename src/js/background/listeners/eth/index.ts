import { ETH_APPROVE_TX, ETH_GET_ACCOUNTS, ETH_SIGN_TX } from './../../../constants/blockchains/eth';
import networks from './../../../blockchain';

export default ({ App }) => async ({ type, payload }, sendResponse) => {
  switch (type) {
    case ETH_GET_ACCOUNTS: {
      sendResponse({
        payload: App.io.eth.getAccounts()
      });

      break;
    }

    case ETH_APPROVE_TX: {
      App.io.eth
        .approveTx({
          blockchain: networks.ETH.sign,
          tx: payload
        })
        .then(data => {
          sendResponse({
            payload: data
          });
        });

      break;
    }

    case ETH_SIGN_TX: {
      App.io.eth
        .signTx({
          tx: payload
        })
        .then(data => {
          sendResponse({
            payload: data
          });
        });

      break;
    }
  }
};
