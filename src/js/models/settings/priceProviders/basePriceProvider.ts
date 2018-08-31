export default class BasePriceProvider {
  getPriceBCInUSD(sign) {
    return Promise.reject('base provider must be extended');
  }
}
