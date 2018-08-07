export default function getPrice(prices, sign, amount) {
  if (!prices || !sign || !(prices && prices[sign] && prices[sign].USD)) {
    return '?';
  }

  let usd;

  if (amount === void 0) {
    usd = prices[sign].USD;
  } else {
    usd = prices[sign].USD * amount;
  }

  return isNaN(usd) ? '?' : parseFloat(usd.toFixed(2));
}
