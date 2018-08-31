import { error } from 'loglevel';
import blockchain from '../../blockchain';
import {
  SETTINGS_LOAD_CURRENCY_PRICE,
  SETTINGS_LOAD_CURRENCY_PRICE_FAIL,
  SETTINGS_LOAD_CURRENCY_PRICE_SUCCESS
} from '../../constants/settings';

export default ({ App }) => async ({ type, payload }, sendResponse) => {
  switch (type) {
    // case SETTINGS_LOAD_CURRENCY_PRICE: {
    //   try {
    //     const signs = Object.values(blockchain).map(i => i.sign);
    //     let prices;

    //     App.io.settings.usePriceProvider();

    //     await Promise.all(signs.map(sign => App.io.settings.loadPrice(sign, { convert: 'BTC' })))
    //       .then(res => {
    //         if (Array.isArray(res)) {
    //           prices = res.reduce((acc, v, i) => {
    //             acc[signs[i]] = v;
    //             return acc;
    //           }, {});
    //         }
    //       })
    //       .catch(err => {
    //         error(err);
    //       });

    //     sendResponse({
    //       type: SETTINGS_LOAD_CURRENCY_PRICE_SUCCESS,
    //       payload: {
    //         prices,
    //         providers: App.io.settings.getPriceProviders()
    //       }
    //     });
    //   } catch (err) {
    //     error('error loading price', err);

    //     sendResponse({
    //       type: SETTINGS_LOAD_CURRENCY_PRICE_FAIL
    //     });
    //   }

    //   break;
    // }
  }
};
