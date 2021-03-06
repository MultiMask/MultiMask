import { combineReducers } from 'redux';
import account from '../reducers/account';
import auth from '../reducers/auth';
import profile from '../reducers/profile';
import settings from '../reducers/settings';
import ui from '../reducers/ui';

export const rootReducer = combineReducers({
  account,
  auth,
  profile,
  ui,
  settings
});
