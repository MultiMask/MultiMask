import account from './account';
import auth from './auth';
import wallet from './wallet';

export default function (opts) {
    account(opts);
    auth(opts);
    wallet(opts);
}