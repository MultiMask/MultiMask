import messaging from "../message";

export const ACCOUNT_SET = 'account:set';
export const ACCOUNT_ACTIVE = 'account:set:active';
export const ACCOUNT_SEND = 'account:send';
export const ACCOUNT_BUY = 'account:buy';
export const ACCOUNT_BACK = 'account:back';

export default {
    getInfo: () => (dispatch, getState) => {
        messaging.send({
            type: 'account:info'
        })
    },
    setAccount: accs => (dispatch, getState) => {
        dispatch({
            type: ACCOUNT_SET,
            payload: accs,
        });
    },
    setActive: name => (dispatch, getState) => {
        dispatch({
            type: ACCOUNT_ACTIVE,
            payload: name
        })
    },
    buy: () => (dispatch, getState) => {
        dispatch({
            type: ACCOUNT_BUY,
        })
    },
    send: () => (dispatch, getState) => {
        dispatch({
            type: ACCOUNT_SEND,
        })
    },
    back: () => (dispatch, getState) => {
        dispatch({
            type: ACCOUNT_BACK,
        })
    },
}