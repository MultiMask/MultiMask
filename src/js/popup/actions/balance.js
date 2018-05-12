import messaging from "../message";

export const SET_ACCOUNT = 'account:set';
export const SET_ACTIVE = 'account:set:active';

export default {
    getInfo: () => (dispatch, getState) => {
        messaging.send({
            type: 'account:info'
        })
    },
    setAccount: accs => (dispatch, getState) => {
        dispatch({
            type: SET_ACCOUNT,
            payload: accs,
        });
    },
    setActive: name => (dispatch, getState) => {
        dispatch({
            type: SET_ACTIVE,
            payload: name
        })
    },
}