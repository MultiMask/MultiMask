export default ({ profileController }) => ({
  getList: () => {
    return profileController.plc.getList();
  }
});
