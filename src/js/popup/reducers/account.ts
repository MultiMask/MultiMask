import { ACCOUNT_SET, ACCOUNT_ACTIVE, ACCOUNT_UPDATE, ACCOUNT_GETSEED_RESULT } from '../../constants/account';

const initialState: IPopup.State.Accounts = {
  accounts: null,
  seed: null
};

export default function accountReducer(state: IPopup.State.Accounts = initialState, action) {
  switch (action.type) {
    case ACCOUNT_SET: {
      return {
        ...state,
        accounts: action.payload
      };
    }
    /**
     * Update account in store
     */
    case ACCOUNT_UPDATE: {
      const account = action.payload;

      if (account) {
        const idx = state.accounts.findIndex(acc => acc.key === account.key);

        if (idx !== -1) {
          const list = state.accounts.slice();
          list.splice(idx, 1, account);

          return {
            ...state,
            accounts: list
          };
        }
      }

      break;
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
      };
    }
  }

  return state;
}
