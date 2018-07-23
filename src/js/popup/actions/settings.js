import { SETTINGS_SET_PRICES } from '../../constants/settings';

const settingsActions = {
  setPrices: prices => dispatch => {
    dispatch({ type: SETTINGS_SET_PRICES, payload: { prices } });
  }
};

export default settingsActions;
