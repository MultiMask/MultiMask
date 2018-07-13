import { getEntity, setEntity } from '../getter';
import { decode, encode } from '../../libs/cipher';

export default class Profile {
  constructor(data) {
    this.data = data;
  }

  getId() {
    return this.data.id;
  }

  addAccount(addAccount, pass) {
    this.data.accounts.push(addAccount);
    return this.save();
  }

  save(pass) {
    const key = this.getId();
    const encodedProfile = encode(pass, JSON.stringify(this._serialize()));

    return setEntity(key, encodedProfile);
  }

  _serialize() {
    return {
      ...this.data,
      accounts: this.data.accounts.map(acc => acc.id)
    };
  }
}
