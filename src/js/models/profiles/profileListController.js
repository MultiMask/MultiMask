import { getProfiles, setProfiles, getEntity } from '../getter';
import { decode } from '../../libs/cipher';

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
        return Promise.all(
          ids.map(id => {
            return ProfileFactory.load(this.App.getPass(), id);
          })
        );
      })
      .then(profiles => {
        this.list = profiles;
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
}
