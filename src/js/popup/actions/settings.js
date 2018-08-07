import logLevel from 'loglevel';
import {
  SETTINGS_LOAD_CURRENCY_PRICE,
  SETTINGS_LOAD_CURRENCY_PRICE_SUCCESS,
  SETTINGS_SET_PRICES,
  SETTINGS_SET_PRICE_DATA_PROVIDERS,
  SETTINGS_SET_SETTING
} from '../../constants/settings';
import InternalMessage from '../../libs/InternalMessage';

const settingsActions = {
  getPrices: () => (dispatch, getState) => {
    return InternalMessage.signal(SETTINGS_LOAD_CURRENCY_PRICE)
      .send()
      .then(result => {
        const {
          type,
          payload: { prices, providers }
        } = result;

        if (type === SETTINGS_LOAD_CURRENCY_PRICE_SUCCESS && prices && Array.isArray(providers)) {
          settingsActions.setPriceProviders(providers)(dispatch, getState);
          settingsActions.setPrices(prices)(dispatch, getState);
        }
      })
      .catch(err => {
        logLevel.error({ err });
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
