export default function getPrice(prices, sign, amount) {
  if (!prices || !sign || !(prices && prices[sign] && prices[sign].USD)) {
    return 0;
  }

  let usd;

  if (amount === void 0) {
    usd = parseFloat(prices[sign].USD);
  } else {
    usd = parseFloat(prices[sign].USD * amount);
  }

  return isNaN(usd) ? 0 : parseFloat(usd.toFixed(2));
}
