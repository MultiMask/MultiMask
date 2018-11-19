import Eos from 'eosjs'
const {ecc} = Eos.modules;

import { flatten } from 'helpers/func';

export interface IEosAccountPermission {
  account_name: string;
  permission: string;
  parent?: string;
  core_liquid_balance?: string;
}

export const prettyAccount = (account: IEosAccountPermission) => `${account.account_name}@${account.permission}`;
export const parsePrettyAccount = (account: string) => account.split('@');

export const actionParticipants = (payload) => {
  return flatten<string>(
      payload.messages
          .map(message => message.authorization
              .map(auth => `${auth.actor}@${auth.permission}`))
  );
}

export const parseAccounts = (accountInfo: any[], publicKey): IEosAccountPermission[] => {
  if (!accountInfo) {
    return [];
  }

  return accountInfo.reduce((list, acc) => {
    acc.permissions.forEach(permission => {
      const isAccept = permission.required_auth.keys.some(keyEntity => keyEntity.key === publicKey);

      if (isAccept) {
        list.push({
          account_name: acc.account_name,
          core_liquid_balance: acc.core_liquid_balance,
          permission: permission.perm_name,
          parent: permission.parent,
        })
      }
    });

    return list;
  }, []);
}
