import { combineReducers } from 'redux';

import account from '../reducers/account';
import state from '../reducers/state';

export const rootReducer = combineReducers({
  account,
  state
})
