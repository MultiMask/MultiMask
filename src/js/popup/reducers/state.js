import {
  STATE_CREATE
} from '../../constants/state';

const initialState = {};

export default function accountReducer(state = initialState, action) {
  console.log('state reducer:', action);

  switch (action.type) {
    case STATE_CREATE: {
      return {
        ...state,
        creation: true
      }
      break;
    }
  }

  return state;
}
