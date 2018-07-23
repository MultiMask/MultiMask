import { SETTINGS_SET_PRICES, SETTINGS_SET_SETTING, SETTINGS_SET_PRICE_DATA_PROVIDERS } from '../../constants/settings';

const settingsActions = {
  setPrices: prices => dispatch => {
    dispatch({ type: SETTINGS_SET_PRICES, payload: { prices } });
  },
  setSetting: (key, value) => dispatch => {
    dispatch({ type: SETTINGS_SET_SETTING, payload: { key, value } });
  },
  setPriceProviders: price_providers => dispatch => {
    dispatch({ type: SETTINGS_SET_PRICE_DATA_PROVIDERS, payload: { price_providers } });
  }
};

export default settingsActions;
