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
  getBCPrice(sign) {
    if (!signToIdEnum[sign]) {
      return Promise.reject('');
    }

    return new Promise((resolve, reject) => {
      this.getTickerById(signToIdEnum[sign])
        .then(ticker => {
          if (
            ticker &&
            ticker.data &&
            ticker.data.quotes &&
            ticker.data.quotes.USD &&
            ticker.data.quotes.USD.price !== void 0
          ) {
            resolve({
              USD: ticker.data.quotes.USD.price
            });
          } else {
            reject('incorrect ticker');
          }
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  getTickerById(tickerId) {
    return new Promise((resolve, reject) => {
      axios
        .get(`https://api.coinmarketcap.com/v2/ticker/${tickerId}/`)
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
