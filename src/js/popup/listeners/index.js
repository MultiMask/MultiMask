import auth from './auth';
import wallet from './wallet';

export default function (opts) {
    auth(opts);
    wallet(opts);
}