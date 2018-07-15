import { getEntity, setEntity } from '../getter';

import Account from './';

export default class AccountWrapper {
  constructor(data) {
    this.account = new Account(data);
  }

  get() {
    return this.account;
  }
}
