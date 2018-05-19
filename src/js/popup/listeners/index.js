import account from './account';
import auth from './auth';
import tx from './tx';

export default function (opts) {
  account(opts);
  auth(opts);
  tx(opts);
}
