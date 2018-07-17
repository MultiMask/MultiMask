export default ({ profileController }) => ({
  getList: () => {
    return profileController.plc.getList();
  },

  add: () => {
    return profileController.add();
  },

  remove: id => {
    return profileController.remove(id);
  },

  export: id => {
    return profileController.export(id);
  }
});
