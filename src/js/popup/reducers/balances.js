import { SET_ACCOUNT, SET_ACTIVE } from '../actions/balance';

const initialState = {
    accounts: null,
};

export default function balances(state = initialState, action) {
    console.log('balances reducer:', action);

    switch (action.type) {
        case SET_ACCOUNT: {
            return {
                ...state,
                accounts: action.payload
            }
            break;
        }
        case SET_ACTIVE: {
            return {
                ...state,
                wallet: action.payload
            }

            break;
        }
    }

    return state;
}