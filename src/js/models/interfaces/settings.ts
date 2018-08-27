export default ({ settingsController }) => ({
  loadPrice(sign, convertTo) {
    return settingsController.loadPrice(sign, convertTo);
  },

  getPriceProviders() {
    return settingsController.getPriceProviders();
  },

  getAll() {
    return settingsController.getAll();
  },

  setAll(nextSettings) {
    settingsController.setAll(nextSettings);
  },

  usePriceProvider() {
    settingsController.usePriceProvider();
  }
});
