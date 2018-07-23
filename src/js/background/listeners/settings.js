import log from 'loglevel';
import {
  SETTINGS_LOAD_CURRENCY_PRICE,
  SETTINGS_LOAD_CURRENCY_PRICE_FAIL,
  SETTINGS_LOAD_CURRENCY_PRICE_SUCCESS
} from '../../constants/settings';
import blockchain from '../../blockchain';

export default ({ messaging, App }) => {
  messaging.on(SETTINGS_LOAD_CURRENCY_PRICE, async () => {
    try {
      const signs = Object.values(blockchain).map(i => i.sign);
      let prices;

      await Promise.all(signs.map(sign => App.io.settings.loadPrice(sign)))
        .then(res => {
          if (Array.isArray(res)) {
            prices = res.reduce((acc, v, i) => {
              acc[signs[i]] = v;
              return acc;
            }, {});
          }
        })
        .catch(err => {
          log.error(err);
        });

      messaging.send({
        type: SETTINGS_LOAD_CURRENCY_PRICE_SUCCESS,
        payload: { prices }
      });
    } catch (err) {
      log.error('error loading price', err);

      messaging.send({
        type: SETTINGS_LOAD_CURRENCY_PRICE_FAIL
      });
    }
  });
};
