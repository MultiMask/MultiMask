import { getEntity, setEntity, removeEntity } from '../getter';
import { encode, decode } from '../../libs/cipher';
import uuid from 'uuid/v4';
import log from 'loglevel';

import Profile from './Profile';

export default class ProfileFactory {
  static save(pass, profile) {
    const key = profile.getId();
    const dataToSave = profile.serialize();

    // eslint-disable-next-line
    const encodedProfile = encryptEntities ? encode(pass, JSON.stringify(dataToSave)) : JSON.stringify(dataToSave);

    log.debug('Save Profile > ', encodedProfile);

    return setEntity(key, encodedProfile);
  }

  static load(pass, key) {
    return getEntity(key).then(encodedStr => {
      let profileData;

      try {
        // eslint-disable-next-line
        const decodedStr = encryptEntities ? decode(pass, encodedStr) : encodedStr;
        profileData = JSON.parse(decodedStr);
      } catch (e) {
        throw new Error('Can`t decode profile from storage');
      }

      log.debug('Load Profile > ', profileData);

      return new Profile(profileData);
    });
  }

  static remove(id) {
    return removeEntity(id);
  }

  static create(pass, data) {
    let profile;
    if (data instanceof Profile) {
      profile = data;
    } else {
      profile = new Profile(ProfileFactory.createDefault(data));
    }

    return ProfileFactory.save(pass, profile);
  }

  static createDefault(data) {
    return new Profile({
      id: uuid(),
      name: 'Default profile',
      version: 0,
      accounts: [],
      ...data
    });
  }

  static encryptFullProfile(pass, fullProfile) {
    const str = JSON.stringify(fullProfile);

    return encode(pass, str);
  }
}
