import { debug } from 'loglevel';

import { StorageService } from 'services/StorageService';
import BlockCipher, { cipherTypes } from 'libs/blockCipher';

import { Profile } from 'models/Profile';

const blockCipher = new BlockCipher(cipherTypes.AES256);

export default class ProfileFactory {
  public static save (pass, profile) {
    const key = profile.getId();

    const encodedProfile = blockCipher.encrypt(pass, profile.serialize());

    debug('Save Profile > ', encodedProfile);

    return StorageService.Entities.set(key, encodedProfile);
  }

  public static load (pass, key) {
    return StorageService.Entities.get(key).then(encodedStr => {
      const profileData = blockCipher.decrypt(pass, encodedStr);

      debug('Load Profile > ', profileData);

      return new Profile(profileData);
    });
  }

  public static remove (id) {
    return StorageService.Entities.remove(id);
  }

  public static create (pass, data) {
    let profile;
    if (data instanceof Profile) {
      profile = data;
    } else {
      // TODO: repair it
      profile = new Profile('seed');
    }

    return ProfileFactory.save(pass, profile);
  }

  public static createDefault (data?: any) {
    return new Profile({
      // TODO: repair it
      id: 0,
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
