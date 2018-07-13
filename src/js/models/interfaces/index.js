import AccountController from '../account/accountController';
import ProfileController from '../profiles/profileController';

import AccountInterfaces from './accounts';

export default ({ App }) => {
  const accountController = new AccountController({ App });
  const profileController = new ProfileController({ App, accountController });
  profileController.init();

  return {
    accounts: new AccountInterfaces({ accountController, profileController })
  };
};
