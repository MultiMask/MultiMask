export class DomainAccess {
  private data: IDomainAccess = {};

  constructor(data: IDomainAccess) {
    this.data = data || {};
  }

  public getAllowedAccounts(domain: string): string[] {
    if (this.data.hasOwnProperty(domain)) {
      const domainAccount = this.data[domain];

      return domainAccount.allowed ? domainAccount.accounts : undefined;
    }

    return undefined;
  }

  public isAllowedDomain(domain: string): boolean {
    if (this.data.hasOwnProperty(domain)) {
      return this.data[domain].allowed;
    }

    return undefined;
  }

  public isAllowedAccount(domain: string, accountId: string): boolean {
    if (this.data.hasOwnProperty(domain) && this.data[domain].allowed) {
      return this.data[domain].accounts.includes(accountId);
    }

    return false;
  }

  public add(domain: string, data: IDomainAccount) {
    this.data[domain] = data;
  }

  public toJSON() {
    return this.data;
  }
}
