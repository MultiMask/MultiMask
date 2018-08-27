import { info } from 'loglevel';

import account from './account';
import auth from './auth';
import tx from './tx';
import profile from './profile';
import settings from './settings';

import ui from './ui';
import eth from './eth';

export default opts => (msg, sr) => {
  info('Background receive > ', msg);

  account(opts)(msg, sr);
  auth(opts)(msg, sr);
  profile(opts)(msg, sr);
  settings(opts)(msg, sr);

  ui(opts)(msg, sr);

  tx(opts)(msg, sr);
  eth(opts)(msg, sr);
};
