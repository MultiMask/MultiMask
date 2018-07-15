import ProfileFactory from './profileFactory';

export default class Profile {
  constructor(data) {
    this.data = data;
  }

  getId() {
    return this.data.id;
  }

  getAccounts() {
    return this.data.accounts;
  }

  addAccount(pass, account) {
    this.data.accounts.push(account.id);
    this.increaceVerion();
    return this.save(pass);
  }

  increaceVerion() {
    this.data.version = this.data.version + 1;
  }

  save(pass) {
    return ProfileFactory.save(pass, this);
  }

  _serialize() {
    return {
      ...this.data
    };
  }
}
