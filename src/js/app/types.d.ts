interface IDomainAccount {
  accounts?: string[];
  allowed: boolean;
}
interface IDomainAccess extends Record<string, IDomainAccount> {}

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
