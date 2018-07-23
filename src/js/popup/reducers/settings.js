import { SETTINGS_SET_PRICES } from '../../constants/settings';

const initialState = {
  settings: {}
};

export default function settingsReducer(state = initialState, action) {
  switch (action.type) {
    case SETTINGS_SET_PRICES:
      return {
        ...state,
        ...{
          ...state.settings,
          ...{ prices: action.payload.prices }
        }
      };
    default:
      return state;
  }
}
