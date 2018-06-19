import messaging from '../message';

import accountAction from '../actions/account';
import {
  ACCOUNT_INFO_RESULT,
  ACCOUNT_GETSEED_RESULT,
} from '../../constants/account';

export default function ({ dispatch, getState }) {
  messaging.on(ACCOUNT_INFO_RESULT, data => {
    accountAction.setAccount(data)(dispatch, getState);
  });

  messaging.on(ACCOUNT_GETSEED_RESULT, ({ seed }) => {
    accountAction.showSeed(seed)(dispatch, getState);
  });
}
