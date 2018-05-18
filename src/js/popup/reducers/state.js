import {
  STATE_CREATE,
  STATE_MAIN,
  STATE_WALLET,

  STATE_VIEW_CREATION,
  STATE_VIEW_LOGIN,
  STATE_VIEW_MAIN,
  STATE_VIEW_WALLET,
} from '../../constants/state';

const initialState = {
  view: STATE_VIEW_LOGIN,
};

export default function accountReducer(state = initialState, action) {
  console.log('state reducer:', action);

  switch (action.type) {
    case STATE_CREATE: {
      return {
        ...state,
        view: STATE_VIEW_CREATION,
      }
      break;
    }
    case STATE_MAIN: {
      return {
        ...state,
        view: STATE_VIEW_MAIN,
      }
      break;
    }
    case STATE_WALLET: {
      return {
        ...state,
        view: STATE_VIEW_WALLET,
      }
      break;
    }
  }

  return state;
}
