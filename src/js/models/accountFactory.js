import BitcoinWallet from "./account/wallet/bitcoin";
import Account from './account';

import { getWallet, setWallet } from './getter';

export default {
    create({ network }) {
        let wallet;
        if (network === 'bitcoin') {
            wallet = new BitcoinWallet();
        }

        return new Account(wallet, network);
    },

    restore(account) {
        console.log('Restore wallet:>', account.name, account.network);

        let wallet;
        if (account.network === 'bitcoin') {
            wallet = new BitcoinWallet();
        }

        const acc = new Account(wallet, account.network);
        acc.name = account.name;
        acc.create(account.wallet.seed);
        
        return acc;
    },

    save(account) {
        // console.log('save account raw:', account);
        const str = JSON.stringify(account);
        // TODO: Add encoding
        const encodedWallet = str;

        // console.log('save account raw:', encodedWallet);

        setWallet(account.name, encodedWallet);
    },

    load(accountName) {
        return getWallet(accountName).then(str => {
            // TODO: add decoded
            const decoded = JSON.parse(str);
    
            return this.restore(decoded);
        })
    },

    remove(accountName) {
        setWallet(account.name, undefined);
    }
}