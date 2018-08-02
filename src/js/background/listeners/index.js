import log from 'loglevel';

import account from './account';
import auth from './auth';
import ui from './ui';
import tx from './tx';
import profile from './profile';

import eth from './eth';

export default opts => (...args) => {
  log.info('Background receive > ', args[0]);

  auth(opts)(...args);
  // account(opts)(...args);
  // profile(opts)(...args);

  // ui(opts)(...args);

  // tx(opts)(...args);
  // eth(opts)(...args);
};
