import BitcoinWallet from "./account/wallet/bitcoin";
import Account from './account';

export default {
    create({ network }) {
        let wallet;
        if (network === 'bitcoin') {
            wallet = new BitcoinWallet();
        }

        return new Account(wallet, network);
    },

    restore(account) {
        let wallet;
        if (account.network === 'bitcoin') {
            wallet = new BitcoinWallet();
        }

        const acc = new Account(wallet, account.network);
        acc.name = account.name;
        acc.create(account.wallet.seed);
        
        return acc;
    }
}