export default class BasePriceProvider {
  public getPriceBCInUSD(sign) {
    return Promise.reject('base provider must be extended');
  }
}
