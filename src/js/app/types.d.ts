interface IDomainAccount {
  accounts?: string[];
  allowed: boolean;
}
interface IDomainAccess extends Record<string, IDomainAccount> {}

interface IKeyStore {
  master: string;
  [K: number]: string;
}

interface IProfileData {
  keys: IKeyStore;
  accounts: IAccountKeyData[];
}

interface IAccountKeyData {
  data?: string;
  name?: string;
  segwit?: boolean;

  bc?: string;
  network?: string;
  key?: string;
}

interface IMeseeageInternal {
  type: string;
  payload: any;
}

interface IMessageInternalResultSuccess {
  success: true;
  payload?: any;
}

interface IMessageInternalResultFailed {
  success: boolean;
  error?: string;
}

type IMeseeageInternalResult = IMessageInternalResultSuccess | IMessageInternalResultFailed;
type InternalResponseFn = (res: IMeseeageInternalResult) => void;
