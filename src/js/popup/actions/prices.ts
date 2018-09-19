const priceActions = {
  getPrice: (amount: number, sign: string) => (dispatch, getState) => {
    const { prices } = getState().settings;

    if (!prices || !sign || !(prices && prices[sign] && prices[sign].USD)) {
        return 0;
    }
    
    let usd;
    
    if (amount === void 0) {
      usd = parseFloat(prices[sign].USD);
    } else {
      usd = parseFloat(prices[sign].USD * amount as any);
    }

    return isNaN(usd) ? 0 : parseFloat(usd.toFixed(2));
  },
  getPriceInBTC: (amount: number, sign: string) => (dispatch, getState) => {
    const { prices } = getState().settings;

    let btc;

  if (!prices || !sign  || !prices[sign].BTC) {
    return 0;
  }

  if (prices) {
    btc = parseFloat(prices[sign].BTC * amount as any);
  }

  return isNaN(btc) ? 0 : parseFloat(btc.toFixed(2));
  },
};

export default priceActions;
