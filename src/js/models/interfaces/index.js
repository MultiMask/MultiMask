import AccountController from '../account/accountController';
import ProfileController from '../profiles/profileController';

import auth from './auth';
import AccountInterfaces from './accounts';
import tx from './tx';
import profile from './profile';

export default ({ App }) => {
  const accountController = new AccountController({ App });
  const profileController = new ProfileController({ App, accountController });

  return {
    accounts: new AccountInterfaces({ profileController }),
    auth: auth({ profileController }),
    tx: tx({ profileController }),
    profile: profile({ profileController })
  };
};
