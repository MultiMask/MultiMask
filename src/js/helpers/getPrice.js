export default function getPrice(prices, sign, amount) {
  if (!prices || !sign || !(prices && prices[sign] && prices[sign].USD)) {
    return '?';
  }

  if (!amount) {
    return prices[sign].USD.toFixed(2);
  }

  const usd = prices[sign].USD * amount;

  return isNaN(usd) ? '?' : usd.toFixed(2);
}
