export default ({ settingsController }) => ({
  loadPrice(sign) {
    return settingsController.loadPrice(sign);
  },

  getPriceProviders() {
    return settingsController.getPriceProviders();
  },

  getAll() {
    return settingsController.getAll();
  },

  setAll(nextSettings) {
    settingsController.setAll(nextSettings);
  }
});
