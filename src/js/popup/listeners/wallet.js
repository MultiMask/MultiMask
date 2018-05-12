import { ACCOUNT_INFO_RESULT} from '../../constants/account';

import action from '../actions/account';
import messaging from '../message';

export default function ({ dispatch, getState }) {
    messaging.on(ACCOUNT_INFO_RESULT, data => {
        action.setAccount(data)(dispatch, getState);
    });
}