import AccountController from '../account/accountController';
import ProfileController from '../profiles/profileController';
import SettingsController from '../settings/settingsController';
import EthController from '../providers/eth';

import auth from './auth';
import accounts from './accounts';
import tx from './tx';
import profile from './profile';
import settings from './settings';
import eth from './eth';

export default ({ App }) => {
  const accountController = new AccountController({ App });
  const profileController = new ProfileController({ App, accountController });
  const settingsController = new SettingsController({ App });
  const ethController = new EthController({ accountController });

  console.log(ethController);

  return {
    accounts: accounts({ App, profileController }),
    auth: auth({ App, profileController }),
    tx: tx({ App, profileController }),
    profile: profile({ App, profileController }),
    settings: settings({ settingsController }),
    eth: eth({ ethController })
  };
};
