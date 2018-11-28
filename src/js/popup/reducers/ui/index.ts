import { combineReducers } from 'redux';

import needauth from './needauth';
import profileCreate from './createProfile';
import modal from './modal';

export default combineReducers({
  needauth,
  profileCreate,
  modal
});
