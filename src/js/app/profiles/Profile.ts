import ProfileFactory from './profileFactory';

export class Profile {
  public data: any;

  constructor (data) {
    this.data = data;
  }

  public getId () {
    return this.data.id;
  }

  public getAccounts () {
    return this.data.accounts;
  }

  public addAccount (pass, account) {
    this.data.accounts.push(account.id);
    this.increaceVerion();
    return this.save(pass);
  }

  public increaceVerion () {
    this.data.version = this.data.version + 1;
  }

  public save (pass) {
    return ProfileFactory.save(pass, this);
  }

  public update (pass, newData) {
    this.data = { ...this.data, ...newData };
    this.increaceVerion();
    return this.save(pass);
  }

  public serialize () {
    return {
      ...this.data
    };
  }
}
