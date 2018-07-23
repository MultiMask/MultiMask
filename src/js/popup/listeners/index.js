import account from './account';
import auth from './auth';
import profile from './profile';
import settings from './settings';
import tx from './tx';
import ui from './ui';

export default function(opts) {
  account(opts);
  auth(opts);
  profile(opts);
  settings(opts);
  tx(opts);
  ui(opts);
}
