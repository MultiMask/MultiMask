import AccountController from '../account/accountController';
import ProfileController from '../profiles/profileController';

import auth from './auth';
import accounts from './accounts';
import tx from './tx';
import profile from './profile';

export default ({ App }) => {
  const accountController = new AccountController({ App });
  const profileController = new ProfileController({ App, accountController });

  return {
    accounts: accounts({ App, profileController }),
    auth: auth({ App, profileController }),
    tx: tx({ App, profileController }),
    profile: profile({ App, profileController })
  };
};
