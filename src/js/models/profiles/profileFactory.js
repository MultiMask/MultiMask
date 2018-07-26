import { getEntity, setEntity, removeEntity } from '../getter';
import BlockCipher, { cipherTypes } from '../../libs/blockCipher';
import uuid from 'uuid/v4';
import log from 'loglevel';

import Profile from './Profile';

const blockCipher = new BlockCipher(cipherTypes.AES256);

export default class ProfileFactory {
  static save(pass, profile) {
    const key = profile.getId();

    const encodedProfile = blockCipher.encrypt(pass, profile.serialize());

    log.debug('Save Profile > ', encodedProfile);

    return setEntity(key, encodedProfile);
  }

  static load(pass, key) {
    return getEntity(key).then(encodedStr => {
      const profileData = blockCipher.decrypt(pass, encodedStr);

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

  static encryptFullProfile(pass, fullProfile, full) {
    return blockCipher.encrypt(pass, fullProfile, full);
  }

  static decryptFullProfile(pass, fullProfile) {
    return blockCipher.decrypt(pass, fullProfile);
  }
}
