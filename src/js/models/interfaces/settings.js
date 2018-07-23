export default ({ settingsController }) => ({
  loadPrice(sign) {
    return settingsController.loadPrice(sign);
  },

  getAll() {
    return settingsController.getAll();
  },

  setAll(nextSettings) {
    settingsController.setAll(nextSettings);
  }
});
