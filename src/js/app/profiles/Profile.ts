import ProfileFactory from './profileFactory';

export class Profile {
  public data: any;

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

  update(pass, newData) {
    this.data = { ...this.data, ...newData };
    this.increaceVerion();
    return this.save(pass);
  }

  serialize() {
    return {
      ...this.data
    };
  }
}
