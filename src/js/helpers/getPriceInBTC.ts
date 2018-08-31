export default function getPriceInBTC(prices, account) {
  let btc;

  if (prices !== void 0 || account !== void 0 || prices[account.blockchain]['BTC'] !== void 0) {
    btc = 0;
  }

  if (prices) {
    btc = parseFloat(prices[account.blockchain]['BTC'] * account.info.balance as any);
  }

  return isNaN(btc) ? 0 : parseFloat(btc.toFixed(2));
}
