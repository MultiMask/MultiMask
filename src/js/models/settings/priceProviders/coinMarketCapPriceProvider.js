import axios from 'axios';
import basePriceProvider from './basePriceProvider';

let signToIdEnum = {};
(function(obj) {
  Object.entries({
    1: 'BTC',
    1027: 'ETH'
  }).map(entry => {
    obj[(obj[entry[0]] = entry[1])] = entry[0];
  });
})(signToIdEnum);

export default class CoinMarketCapPriceProvider extends basePriceProvider {
  getBCPrice(sign, params) {
    if (!signToIdEnum[sign]) {
      return Promise.reject('');
    }

    return new Promise((resolve, reject) => {
      this.getTickerById(signToIdEnum[sign], params)
        .then(ticker => {
          if (ticker && ticker.data && ticker.data.quotes) {
            let prices = {};

            if (ticker.data.quotes.USD && ticker.data.quotes.USD.price !== void 0) {
              prices = { ...prices, ...{ USD: ticker.data.quotes.USD.price } };
            }

            if (
              params &&
              params.convert &&
              ticker.data.quotes[params.convert] &&
              ticker.data.quotes[params.convert].price !== void 0
            ) {
              prices = { ...prices, ...{ [params.convert]: ticker.data.quotes[params.convert].price } };
            }

            resolve(prices);
          } else {
            reject('incorrect ticker');
          }
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  getTickerById(tickerId, params) {
    return new Promise((resolve, reject) => {
      const prs = [];
      params && params.convert && prs.push(`convert=${params.convert}`);

      axios
        .get(`https://api.coinmarketcap.com/v2/ticker/${tickerId}/${prs.length ? `?${prs.join(',')}` : ''}`)
        .then(res => {
          if (res && res.data) {
            resolve(res.data);
          } else {
            reject('incorrect data');
          }
        })
        .catch(err => {
          reject(err);
        });
    });
  }
}
