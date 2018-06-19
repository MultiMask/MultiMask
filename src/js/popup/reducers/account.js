import {
  ACCOUNT_SET,
  ACCOUNT_ACTIVE,
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
    case ACCOUNT_GETSEED_RESULT: {
      return {
        ...state,
        seed: action.payload.seed
      }
    }
  }

  return state;
}
