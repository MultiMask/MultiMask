import ProfileListController from './profileListController';
import ProfileFactory from './profileFactory';

import AccountFactory from './../account/accountFactory';
import Profile from './Profile';

export default class ProfileController {
  public App: any;
  public ac: any;
  public plc: any;
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

  create(data) {
    const profile = new Profile(data);

    ProfileFactory.create(this.getPass(), profile);
    this.plc.add(profile);
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

  async getFullInfo(id) {
    const profile = this.plc.findById(id);

    if (profile) {
      return this.ac.getAccountsSerialized(profile.getAccounts(), this.getPass()).then(accounts => {
        profile.wallets = accounts;

        return profile;
      });
    } else {
      return Promise.resolve();
    }
  }

  add() {
    return this.createDefault();
  }

  remove(id) {
    if (id !== this.currentProfileId) {
      this.plc.remove(id);
    }
  }

  export(id) {
    return this.getFullInfo(id).then(profile => {
      return ProfileFactory.encryptFullProfile(this.getPass(), profile, true);
    });
  }

  update(id, data) {
    this.plc.update(this.getPass(), id, data);
  }

  import(pass, encryptedProfile) {
    const decryptProfile = ProfileFactory.decryptFullProfile(pass, encryptedProfile);

    if (!decryptProfile) return;

    const oldProfile = this.plc.findById(decryptProfile.data.id);

    if (!oldProfile) {
      decryptProfile.wallets.map(wallet => this.ac.import(this.getPass(), wallet));
      return this.create(decryptProfile.data);
    }

    if (oldProfile.data.version < decryptProfile.data.version) {
      decryptProfile.wallets.map(wallet => this.ac.import(this.getPass(), wallet));
      return this.update(oldProfile.data.id, decryptProfile.data);
    }

    return;
  }

  select(id) {
    const selectedProfile = this.plc.findById(id);
    this.setCurrrent(selectedProfile);
  }

  getData() {
    const profileList = this.plc.getList();
    return { list: profileList, profileId: this.currentProfileId };
  }
}
