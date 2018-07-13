import { getProfiles, setProfiles, getEntity, setEntity, removeEntity } from '../getter';
import { encode, decode } from '../../libs/cipher';
import uuid from 'uuid/v4';

import Profile from './Profile';

export default class ProfileFactory {
  static save(pass, profile) {
    const key = profile.getId();
    const encodedProfile = encode(pass, JSON.stringify(profile));

    return setEntity(key, encodedProfile);
  }

  static load(pass, key) {
    return getEntity(key).then(encodedStr => {
      let profileData;

      try {
        const decodedStr = decode(pass, encodedStr);
        profileData = JSON.parse(decodedStr);
      } catch (e) {
        throw new Error('Can`t decode profile from storage');
      }

      return new Profile(profileData);
    });
  }

  static create(pass, data) {
    const profile = new Profile(data);

    return ProfileFactory.save(pass, profile);
  }

  static createDefault(pass) {
    return ProfileFactory.create(pass, {
      id: uuid(),
      name: 'Default profile',
      version: 1,
      accounts: []
    });
  }
}
