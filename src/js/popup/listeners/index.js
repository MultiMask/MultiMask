import account from './account';
import auth from './auth';
import tx from './tx';
import profile from './profile';

import ui from './ui';

export default function(opts) {
  account(opts);
  auth(opts);
  tx(opts);
  ui(opts);
  profile(opts);
}
