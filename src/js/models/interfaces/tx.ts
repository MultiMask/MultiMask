export default ({ profileController }) => ({
  sendTX: ({ id, tx }) => {
    const account = profileController.ac.getAccountById(id);

    return account.sendTX(tx);
  }
});
