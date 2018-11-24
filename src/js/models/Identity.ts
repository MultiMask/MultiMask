import Network from './Network';

/**
 * Required fields for Identity
 */

export const PersonalFields = {
  firstname: 'firstname',
  lastname: 'lastname',
  email: 'email',
  birthdate: 'birthdate'
};

export const LocationFields = {
  phone: 'phone',
  address: 'address',
  city: 'city',
  state: 'state',
  country: 'country',
  zipcode: 'zipcode'
};

export const AccountFields = {
  blockchain: 'blockchain',
  network: 'network'
};

export const IdentityBaseFields = {
  account: 'accounts'
};

/**
 * Checker for Identity Fields
 */
export class IdentityRequiredFields {
  public accounts;
  public personal;
  public location;

  constructor() {
    this.accounts = [];
    this.personal = [];
    this.location = [];
  }

  public static placeholder() {
    return new IdentityRequiredFields();
  }
  public static fromJson(json) {
    const p = Object.assign(new IdentityRequiredFields(), json);
    p.accounts = json.hasOwnProperty('accounts') ? json.accounts.map(Network.fromJson) : [];
    return p;
  }

  public isEmpty() {
    return !this.accounts.length && !this.personal.length && !this.location.length;
  }

  public isValid() {
    if (JSON.stringify(Object.keys(new IdentityRequiredFields())) !== JSON.stringify(Object.keys(this))) {
      return false;
    }
    if (!this.personal.every(field => Object.keys(PersonalFields).includes(field))) {
      return false;
    }
    if (!this.location.every(field => Object.keys(LocationFields).includes(field))) {
      return false;
    }
    if (this.accounts.length && !this.accounts.every(network => network.isValid())) {
      return false;
    }
    return true;
  }

  public toFieldsArray() {
    const fields = [];
    Object.keys(this).map(key => {
      if (key === IdentityBaseFields.account) {
        this[key].map(network => fields.push(`ACCOUNT: ${network.unique()}`));
      } else {
        this[key].map(subKey => fields.push(subKey));
      }
    });
    return fields;
  }
}
