import { getPass } from './getter';
import { hash } from './../libs/cipher';

const salt = 'multimask';

export default {

    init() {
        getPass().then(passHash => this.passHash);
    },

    isAuth() {
        return !!this.password;
    },

    auth(pass) {
        const isAuth = hash(pass) === this.passHash;

        if (isAuth) {
            this.password = pass;
        }

        return isAuth;
    }
}