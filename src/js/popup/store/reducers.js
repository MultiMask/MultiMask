import { combineReducers } from 'redux';

import account from '../reducers/account';
import auth from '../reducers/auth';
import state from '../reducers/state';
import profile from '../reducers/profile';
import ui from '../reducers/ui';

export const rootReducer = combineReducers({
  account,
  auth,
  state,
  profile,
  ui
});
