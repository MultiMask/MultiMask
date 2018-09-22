import uuid from 'uuid/v4';
import { debug } from 'loglevel';

import { getEntity, setEntity, removeEntity } from 'services/getter';
import BlockCipher, { cipherTypes } from 'libs/blockCipher';

import {Profile} from './Profile';

const blockCipher = new BlockCipher(cipherTypes.AES256);

export default class ProfileFactory {
  public static save (pass, profile) {
    const key = profile.getId();

    const encodedProfile = blockCipher.encrypt(pass, profile.serialize());

    debug('Save Profile > ', encodedProfile);

    return setEntity(key, encodedProfile);
  }

  public static load (pass, key) {
    return getEntity(key).then(encodedStr => {
      const profileData = blockCipher.decrypt(pass, encodedStr);

      debug('Load Profile > ', profileData);

      return new Profile(profileData);
    });
  }

  public static remove (id) {
    return removeEntity(id);
  }

  public static create (pass, data) {
    let profile;
    if (data instanceof Profile) {
      profile = data;
    } else {
      profile = new Profile(ProfileFactory.createDefault(data));
    }

    return ProfileFactory.save(pass, profile);
  }

  public static createDefault (data?: any) {
    return new Profile({
      id: uuid(),
      name: 'Default profile',
      version: 0,
      accounts: [],
      ...data
    });
  }

  public static encryptFullProfile (pass, fullProfile, full) {
    return blockCipher.encrypt(pass, fullProfile, full);
  }

  public static decryptFullProfile (pass, fullProfile) {
    return blockCipher.decrypt(pass, fullProfile);
  }
}
