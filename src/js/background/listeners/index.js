import account from './account';
import auth from './auth';
import ui from './ui';
import tx from './tx';
import profile from './profile';

import eth from './eth';

export default ({ messaging, App }) => {
  account({ messaging, App });
  auth({ messaging, App });
  ui({ messaging, App });
  tx({ messaging, App });
  profile({ messaging, App });
  eth({ messaging, App });
};
