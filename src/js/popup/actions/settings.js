import InternalMessage from '../../libs/InternalMessage';

import {
  SETTINGS_SET_PRICES,
  SETTINGS_LOAD_CURRENCY_PRICE,
  SETTINGS_SET_SETTING,
  SETTINGS_SET_PRICE_DATA_PROVIDERS
} from '../../constants/settings';

const settingsActions = {
  getPrices: () => dispatch => {
    return InternalMessage.signal(SETTINGS_LOAD_CURRENCY_PRICE)
      .send()
      .then(result => {
        // TODO: set prices and providers
        console.log(result);
      });
  },
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
