export default ({ profileController }) => ({
  getList: () => {
    return profileController.plc.getList();
  },

  add: () => {
    return profileController.createDefault();
  },

  remove: id => {
    return profileController.remove(id);
  }
});
