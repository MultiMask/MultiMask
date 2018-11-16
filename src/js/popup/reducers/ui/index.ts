import { combineReducers } from 'redux';

import needauth from './needauth';
import profileCreate from './createProfile';

export default combineReducers({
  needauth,
  profileCreate
})
