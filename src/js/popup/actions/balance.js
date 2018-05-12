import messaging from "../message";

export default {
    getInfo: () => (dispatch, getState) => {
        messaging.send({
            type: 'account:info'
        })
    },
}