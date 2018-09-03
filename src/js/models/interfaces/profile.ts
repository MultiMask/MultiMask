export default ({ profileController }) => ({
  // getProfileById: id => {
  //   return profileController.export(id);
  // },

  // getData: () => {
  //   return profileController.getData();
  // },

  // getList: () => {
  //   return profileController.plc.getList();
  // },

  // add: () => {
  //   return profileController.add();
  // },

  // remove: id => {
  //   return profileController.remove(id);
  // },

  // export: id => {
  //   return profileController.export(id);
  // },

  import: (pass, data) => {
    return profileController.import(pass, data);
  },

  // update: (id, data) => {
  //   return profileController.update(id, data);
  // },

  // select: profileId => {
  //   return profileController.select(profileId);
  // }
});
