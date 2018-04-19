import account from './account';
import auth from './auth';
import tx from './tx';

export default ({ messaging, wallet, App }) => {

    account({ messaging, wallet, App });
    auth({ messaging, wallet, App });
    tx({ messaging, wallet, App });
}