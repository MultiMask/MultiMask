import AccountController from '../account/accountController';
import ProfileController from '../profiles/profileController';

import Auth from './auth';
import AccountInterfaces from './accounts';

export default ({ App }) => {
  const accountController = new AccountController({ App });
  const profileController = new ProfileController({ App, accountController });

  return {
    accounts: new AccountInterfaces({ profileController }),
    auth: Auth({ profileController })
  };
};
