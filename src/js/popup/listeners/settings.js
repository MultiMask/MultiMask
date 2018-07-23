import { AUTH_LOGIN_RESULT, AUTH_CHECK_SUCCESS } from '../../constants/auth';
import {
  SETTINGS_LOAD_CURRENCY_PRICE,
  SETTINGS_LOAD_CURRENCY_PRICE_SUCCESS,
  SETTINGS_SET_PRICE_DATA_PROVIDERS
} from '../../constants/settings';
import settingsActions from '../actions/settings';
import messaging from '../message';

export default ({ dispatch }) => {
  messaging.on(AUTH_LOGIN_RESULT, ({ login }) => {
    login && messaging.send({ type: SETTINGS_LOAD_CURRENCY_PRICE });
  });

  messaging.on(AUTH_CHECK_SUCCESS, () => {
    messaging.send({ type: SETTINGS_LOAD_CURRENCY_PRICE });
  });

  messaging.on(SETTINGS_LOAD_CURRENCY_PRICE_SUCCESS, payload => {
    const { prices } = payload;

    settingsActions.setPrices(prices)(dispatch);
  });

  messaging.on(SETTINGS_SET_PRICE_DATA_PROVIDERS, payload => {
    const { price_providers } = payload;

    settingsActions.setPriceProviders(price_providers)(dispatch);
  });
};
