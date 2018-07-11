import { getProfiles, setProfiles, getEntity, setEntity, removeEntity } from './getter';
import { encode, decode } from './../libs/cipher';
import uuid from 'uuid/v4';

export default class ProfileManager {
  profiles = [];
  currentProfileId = null;

  constructor({ App, accountManager }) {
    this.App = App;
    this.accountManager = accountManager;
  }

  init() {
    this.restoreProfiles().then(profiles => {
      if (profiles && profiles.length > 0) {
        const firstProfile = profiles[0];

        this.restoreOne(firstProfile);
      } else {
        this.createDefault();
      }
    });
  }

  restoreProfiles() {
    return getProfiles();
  }

  restoreOne = profile => {
    this.accountManager.restore(profile.accounts).then(accounts => {
      this.setCurrrent(profile.id);
    });
  };

  setCurrrent(id) {
    const newCurrentProfile = this.profiles.find(pro => pro.id === id);

    this.accountManager.clearList();
    this.accountManager.restore(newCurrentProfile.accounts);
  }

  getProfile(id) {
    return this.profiles.find(pro => pro.id === this.id);
  }

  getCurrent() {
    return this.getProfile(this.currentProfileId);
  }

  dropProfile(id) {
    if (id === this.currentProfileId) {
      this.accountManager.clearList();
    }
  }

  createDefault() {
    const defaultProfile = {
      id: uuid(),
      name: 'Default profile',
      version: 1,
      accounts: []
    };

    this.profiles.push(defaultProfile);
    this.setCurrrent(defaultProfile.id);
    this.save(defaultProfile);
  }

  add(profile) {
    this.profiles.push(profile);
    return this.profiles;
  }

  getList() {
    return this.profiles;
  }

  saveList() {
    const list = this.profiles.map(profile => profile.id);
    setProfiles(list);
  }

  remove() {}

  export(id, pass) {}

  import(profile) {}

  save(profile) {
    const key = profile.id;
    const encodedProfile = encode(this.App.getPass(), JSON.stringify(profile));

    return setEntity(key, encodedProfile);
  }

  load(key) {
    return getEntity(key).then(encodedStr => {
      let profile;

      try {
        const decodedStr = decode(this.App.getPass(), encodedStr);
        profile = JSON.parse(decodedStr);
      } catch (e) {
        throw new Error('Can`t decode profile from storage');
      }

      return profile;
    });
  }
}
