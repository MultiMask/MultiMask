import { getProfiles, getProfile } from './getter';

export class ProfileManager {
  profiles = [];

  constructor({ App }) {
    this.App = App;
  }

  restoreProfiles() {
    getProfiles().then(this.restore.bind(this));
  }

  restoreList(profiles) {
    console.log('load all profiles:', profiles);

    if (profiles && profiles.length > 0) {
      this.loadProfiles(profiles).then(profileList => {
        profileList.forEach(profile => this.addRawAccount(profile));
      });
    } else {
      this.createDefault();
    }
  }

  loadProfiles(accounts) {
    // return Promise.all(accounts.map(accountName => AccountFactory.load(this.App.getPass(), accountName)));
  }

  restoreOne = profile => {};

  createDefault() {}

  getList() {}

  remove() {}

  export(id, pass) {}

  import(profile) {}
}
