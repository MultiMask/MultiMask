import ProfileListController from './profileListController';
import ProfileFactory from './profileFactory';

import AccountFactory from './../account/accountFactory';

export default class ProfileController {
  currentProfileId = null;

  constructor({ App, accountController }) {
    this.App = App;
    this.ac = accountController;
    this.plc = new ProfileListController({ App });
  }

  getPass() {
    return this.App.getPass();
  }

  init() {
    return this.plc.get().then(profiles => {
      if (profiles && profiles.length > 0) {
        const firstProfile = profiles[0];

        return this.setCurrrent(firstProfile);
      } else {
        return this.createDefault();
      }
    });
  }

  createDefault() {
    const profile = ProfileFactory.createDefault();

    ProfileFactory.create(this.getPass(), profile);
    this.plc.add(profile);

    return this.setCurrrent(profile);
  }

  setCurrrent(profile) {
    this.currentProfileId = profile.getId();

    this.ac.clearList();
    return this.ac.restore(profile.getAccounts(), this.getPass());
  }

  getCurrent() {
    return this.plc.findById(this.currentProfileId);
  }

  addAccount(accountData) {
    const profile = this.getCurrent();
    const account = AccountFactory.create(accountData);

    return profile.addAccount(this.getPass(), account).then(() => {
      AccountFactory.save(this.getPass(), account);
      this.ac.addAccountInstance(account);
    });
  }

  getAccounts() {
    return this.ac.getAccounts();
  }

  dropProfile(id) {}

  add(profile) {}

  remove(id) {}

  export(pass, id) {}

  import(pass, profile) {}
}
