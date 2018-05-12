import {
    ACCOUNT_SET,
    ACCOUNT_ACTIVE,
    ACCOUNT_BUY,
    ACCOUNT_SEND,
    ACCOUNT_BACK
} from '../../constants/account';

const initialState = {
    accounts: null,
};

export default function balances(state = initialState, action) {
    console.log('balances reducer:', action);

    switch (action.type) {
        case ACCOUNT_SET: {
            return {
                ...state,
                accounts: action.payload
            }
            break;
        }
        case ACCOUNT_ACTIVE: {
            return {
                ...state,
                wallet: action.payload
            }
            break;
        }
        case ACCOUNT_BUY: {
            return {
                ...state,
                buy: true
            }
            break;
        }
        case ACCOUNT_SEND: {
            return {
                ...state,
                send: true
            }
            break;
        }
        case ACCOUNT_BACK: {
            if (state.buy || state.send) {
                return {
                    ...state,
                    send: false,
                    buy: false
                }
            } else {
                return {
                    ...state,
                    wallet: undefined
                }
            }
            break;
        }
    }

    return state;
}