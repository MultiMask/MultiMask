export default ({ App, profileController }) => ({
  isReady: () => {
    return App.isReady();
  },

  init: () => {
    return profileController.init();
  }
});
