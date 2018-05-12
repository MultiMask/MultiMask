import action from '../actions/balance';
import messaging from '../message';

export default function ({ dispatch, getState }) {
    messaging.on('account:info:result', data => {
        action.setAccount(data)(dispatch, getState);
    });
}