import { ACCOUNT_INFO_RESULT} from '../../constants/account';
import { AUTH_LOGIN_RESULT } from '../../constants/auth';

import accountAction from '../actions/account';
import authAction from '../actions/auth';

import messaging from '../message';

export default function ({ dispatch, getState }) {
    messaging.on(ACCOUNT_INFO_RESULT, data => {
        accountAction.setAccount(data)(dispatch, getState);
    });

    // messaging.on("auth:check:success", () => {
    //     stateAction.goMain()(dispatch, getState);
    // });

    messaging.on(AUTH_LOGIN_RESULT, ({ login }) => {
        if (login) {
            authAction.success()(dispatch, getState);
        } else {
            authAction.fail()(dispatch, getState);
        }
      });
}