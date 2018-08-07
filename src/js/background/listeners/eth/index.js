import txCtrl from '../../../models/providers/tx';
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
      txCtrl
        .approveTx({
          blockchain: networks.ETH.sign,
          tx: payload
        })
        .then(data => {
          sendResponse({
            payload: data
          });
        });
    }
  }
};
