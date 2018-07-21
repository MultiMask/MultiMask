import { getProfiles, setProfiles } from '../getter';

import ProfileFactory from './profileFactory';
import AccountFactory from './../account/accountFactory';

export default class ProfileListController {
  list = null;

  constructor({ App }) {
    this.App = App;
  }

  get() {
    if (this.list) {
      return Promise.resolve(this.list);
    }

    return getProfiles()
      .then(ids => {
        if (ids && ids.length > 0) {
          return Promise.all(
            ids.map(id => {
              return ProfileFactory.load(this.App.getPass(), id);
            })
          );
        } else {
          return [];
        }
      })
      .then(profiles => {
        this.list = profiles || [];
        return this.list;
      });
  }

  add(profile) {
    this.list.push(profile);
    this.save();

    return this.list;
  }

  remove(id) {
    const profile = this.findById(id);
    const idx = this.list.findIndex(profile => profile.getId() === id);

    if (idx > -1) {
      this.list.splice(idx, 1);
      this.save();

      ProfileFactory.remove(id);
      AccountFactory.removeList(profile.getAccounts());
    }
  }

  update(pass, id, data) {
    const idx = this.list.findIndex(profile => profile.getId() === id);
    if (idx > -1) {
      this.list[idx].update(pass, data);

      this.save();
    }
  }

  save() {
    const profileIds = this.list.map(profile => profile.getId());

    return setProfiles(profileIds);
  }

  findById(id) {
    return this.list.find(profile => profile.getId() === id);
  }

  getList() {
    return this.list.map(profile => profile.serialize());
  }
}
