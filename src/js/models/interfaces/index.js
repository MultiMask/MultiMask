import AccountController from '../account/accountController';
import ProfileController from '../profiles/profileController';
import SettingsController from '../settings/settingsController';

import auth from './auth';
import AccountInterfaces from './accounts';
import tx from './tx';
import profile from './profile';
import settings from './settings';

export default ({ App }) => {
  const accountController = new AccountController({ App });
  const profileController = new ProfileController({ App, accountController });
  const settingsController = new SettingsController({ App });

  return {
    accounts: new AccountInterfaces({ profileController }),
    auth: auth({ profileController }),
    tx: tx({ profileController }),
    profile: profile({ profileController }),
    settings: settings({ settingsController })
  };
};
