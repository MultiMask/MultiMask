import axios from 'axios';
import basePriceProvider from './basePriceProvider';
import { BCSign } from 'bcnetwork';

const signToIdEnum = {};
(function(obj) {
  Object.entries({
    1: BCSign.BTC,
    2: BCSign.LTC,
    74: BCSign.DOGE,
    1027: BCSign.ETH,
    1765: BCSign.EOS
  }).map(entry => {
    obj[(obj[entry[0]] = entry[1])] = entry[0];
  });
})(signToIdEnum);

export default class CoinMarketCapPriceProvider extends basePriceProvider {
  public getBCPrice(sign, params) {
    if (!signToIdEnum[sign]) {
      return Promise.reject('Coin not found on Mapping in priceProvider');
    }

    return new Promise((resolve, reject) => {
      this.getTickerById(signToIdEnum[sign], params)
        .then((ticker: any) => {
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

  public getTickerById(tickerId, params) {
    return new Promise((resolve, reject) => {
      const prs = [];
      params && params.convert && prs.push(`convert=${params.convert}`);

      axios
        .get(`https://api.coinmarketcap.com/v2/ticker/${tickerId}/${prs.length ? `?${prs.join('&')}` : ''}`)
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
