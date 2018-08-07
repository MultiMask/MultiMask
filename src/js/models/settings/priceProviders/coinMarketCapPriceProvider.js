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
  getBCPrice(sign, convertTo) {
    if (!signToIdEnum[sign]) {
      return Promise.reject('');
    }

    return new Promise((resolve, reject) => {
      this.getTickerById(signToIdEnum[sign], convertTo)
        .then(ticker => {
          if (ticker && ticker.data && ticker.data.quotes) {
            let prices = {};

            if (ticker.data.quotes.USD && ticker.data.quotes.USD.price !== void 0) {
              prices = { ...prices, ...{ USD: ticker.data.quotes.USD.price } };
            }

            if (convertTo && ticker.data.quotes[convertTo] && ticker.data.quotes[convertTo].price) {
              prices = { ...prices, ...{ [convertTo]: ticker.data.quotes[convertTo].price } };
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

  getTickerById(tickerId, convertTo) {
    return new Promise((resolve, reject) => {
      const params = [];
      convertTo && params.push(`convert=${convertTo}`);

      axios
        .get(`https://api.coinmarketcap.com/v2/ticker/${tickerId}/${params.length ? `?${params.join(',')}` : ''}`)
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
