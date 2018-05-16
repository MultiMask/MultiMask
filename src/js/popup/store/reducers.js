import { combineReducers } from 'redux';

import account from '../reducers/account';
import auth from '../reducers/auth';
import state from '../reducers/state';

export const rootReducer = combineReducers({
  account,
  auth,
  state
})
