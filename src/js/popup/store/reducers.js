import { combineReducers } from 'redux';

import balance from '../reducers/balances';

export const rootReducer = combineReducers({
    balance
})