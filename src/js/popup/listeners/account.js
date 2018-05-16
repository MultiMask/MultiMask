import messaging from '../message';

import accountAction from '../actions/account';
import { ACCOUNT_INFO_RESULT} from '../../constants/account';

export default function ({ dispatch, getState }) {
    messaging.on(ACCOUNT_INFO_RESULT, data => {
        accountAction.setAccount(data)(dispatch, getState);
    });

    // messaging.on("auth:check:success", () => {
    //     stateAction.goMain()(dispatch, getState);
    // });
}