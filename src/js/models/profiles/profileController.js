import ProfileListController from './profileListController';
import ProfileFactory from './profileFactory';

import AccountFactory from './../account/accountFactory';

export default class ProfileController {
  profiles = [];
  currentProfileId = null;

  constructor({ App, accountController }) {
    this.App = App;
    this.accountController = accountController;
    this.pc = new ProfileListController({ App });
  }

  init() {
    return this.pc.get().then(profiles => {
      console.log('profiles>', profiles);

      if (profiles && profiles.length > 0) {
        const firstProfile = profiles[0];

        // this.restoreOne(firstProfile);
        this.setCurrrent(firstProfile);
      } else {
        this.createDefault();
      }
    });
  }

  createDefault() {
    return ProfileFactory.createDefault(this).then(profile => {
      // this.profiles.push(defaultProfile);
      // this.setCurrrent(defaultProfile.id);
      // this._save(defaultProfile);
      // this._saveList();
    });
  }

  setCurrrent(profile) {
    this.currentProfileId = profile.getId();

    this.accountController.clearList();
    this.accountController.restore(profile.accounts);
  }

  getCurrent() {
    return this.profiles.find(this.currentProfileId);
  }

  addAccount(accountData) {
    console.log('profile controller>addAccount>', accountData);
    const account = AccountFactory.create(accountData);
    // pro
  }

  // _getProfile(id) {
  //   return this.profiles.find(pro => pro.id === this.id);
  // }

  // _dropProfile(id) {
  //   if (id === this.currentProfileId) {
  //     this.accountManager.clearList();
  //   }
  // }

  // add(profile) {
  //   this.profiles.push(profile);
  //   return this.profiles;
  // }

  // _getList() {
  //   return this.profiles;
  // }

  // _saveList() {
  //   const list = this.profiles.map(profile => profile.id);
  //   setProfiles(list);
  // }

  // remove() {}

  // export(id, pass) {}

  // import(profile) {}
}
