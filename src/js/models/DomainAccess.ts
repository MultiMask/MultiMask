export class DomainAccess {
  private data: IDomainAccess = {};

  constructor (data: IDomainAccess) {
    this.data = data;
  }

  public getAllowedAccounts (domain: string): string[] {
    if (this.data.hasOwnProperty(domain)) {
      const domainAccount = this.data[domain];

      return domainAccount.allowed
        ? domainAccount.accounts
        : null;
    }

    return null;
  }

  public isAllowedDomain (domain: string): boolean {
    if (this.data.hasOwnProperty(domain)) {
      const domainAccount = this.data[domain];

      return domainAccount.allowed;
    }
    
    return null;
  }

  public isAllowedAccount (domain: string, accountId: string): boolean {
    if (this.data.hasOwnProperty(domain)) {
      const domainAccount = this.data[domain];

      return domainAccount.accounts.includes(accountId);
    }
    
    return false;
  }

  public add (domain: string, data: IDomainAccount) {
    this.data[domain] = data;
  }

  public serialize () {
    return this.data;
  }
}