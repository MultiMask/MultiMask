import account from './account';
import auth from './auth';
import ui from './ui';
import tx from './tx';
import profile from './profile';
import settings from './settings';

export default ({ messaging, wallet, App }) => {
  account({ messaging, wallet, App });
  auth({ messaging, wallet, App });
  ui({ messaging, wallet, App });
  tx({ messaging, wallet, App });
  profile({ messaging, wallet, App });
  settings({ messaging, App });
};
