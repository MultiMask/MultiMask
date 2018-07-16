import { getProfiles, setProfiles } from '../getter';

import ProfileFactory from './profileFactory';

export default class ProfileListController {
  list = null;

  constructor({ App }) {
    this.App = App;
  }

  get() {
    if (this.list) {
      return this.list;
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

  save() {
    const profileIds = this.list.map(profile => profile.getId());

    return setProfiles(profileIds);
  }

  findById(id) {
    return this.list.find(profile => profile.getId() === id);
  }

  getList() {
    return this.list.map(profile => profile._serialize());
  }
}
