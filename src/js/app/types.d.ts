interface IDomainAccount {
  accounts?: string[];
  allowed: boolean;
}
interface IDomainAccess extends Record<string, IDomainAccount> {}
