import {
  ACCOUNT_SET,
  ACCOUNT_ACTIVE,
  ACCOUNT_BUY,
  ACCOUNT_SEND,
  ACCOUNT_BACK,
  ACCOUNT_GETSEED_RESULT,
} from "../../constants/account";

const initialState = {
  accounts: null,
  seed: null,
};

export default function accountReducer(state = initialState, action) {
  switch (action.type) {
    case ACCOUNT_SET: {
      return {
        ...state,
        accounts: action.payload
      };
    }
    case ACCOUNT_ACTIVE: {
      return {
        ...state,
        wallet: action.payload
      };
    }
    case ACCOUNT_BUY: {
      return {
        ...state,
        buy: true
      };
    }
    case ACCOUNT_SEND: {
      return {
        ...state,
        send: true
      };
    }
    case ACCOUNT_BACK: {
      if (state.buy || state.send) {
        return {
          ...state,
          send: false,
          buy: false
        };
      } else {
        return {
          ...state,
          wallet: undefined
        };
      }
    }
    case ACCOUNT_GETSEED_RESULT: {
      return {
        ...state,
        seed: action.payload.seed
      }
    }
  }

  return state;
}
