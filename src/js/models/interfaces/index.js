import AccountManager from '../accountManager';
import ProfileManager from '../profileManager';

import AccountInterfaces from './accounts';

export default ({ App }) => {
  const accountManager = new AccountManager({ App });

  return {
    accounts: new AccountInterfaces({ accountManager })
  };
};
