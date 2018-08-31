import { SETTINGS_SET_PRICES, SETTINGS_SET_SETTING, SETTINGS_SET_PRICE_DATA_PROVIDERS } from '../../constants/settings';

const initialState = {
  price_providers: [],
  price_provider: 'coinmarketcap',
  show_total: true,
};

export default function settingsReducer(state = initialState, action) {
  switch (action.type) {
    case SETTINGS_SET_PRICES:
      return {
        ...state,
        ...{ prices: action.payload.prices }
      };
    case SETTINGS_SET_SETTING:
      const { key, value } = action.payload;

      if (!key) return state;

      switch (key) {
        case 'show_total':
        case 'price_provider':
          return {
            ...state,
            ...{ [key]: value }
          };
        default:
          return state;
      }
    case SETTINGS_SET_PRICE_DATA_PROVIDERS:
      return {
        ...state,
        ...{
          price_providers: action.payload.price_providers
        }
      };
    default:
      return state;
  }
}
