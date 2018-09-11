const PriceActions = {
  getPriceInUSD: (amount: number, sign: string) => (dispatch, getState) => {
    const state = getState();
    const prices = state.settings.prices;
    
    if (prices && prices[sign]) {
      const total = parseFloat(prices[sign].USD) * amount;
      return total.toFixed(2);
    }
  },

  getPriceInBTC: (amount: number, sign: string) => (dispatch, getState) => {
    const state = getState();
    const prices = state.settings.prices;
    
    if (sign === 'BTC' ) {
      return +amount;
    }

    if (prices && prices[sign]) {
      const total = parseFloat(prices[sign].BTC) * amount;
      return +total.toFixed(2);
    }
  }
}
export default PriceActions;
