import { createSelector } from 'reselect';

const getAccounts = ({ account }) => account.accounts;
const getWallet = ({ account }) => account.wallet;

export const getCurrentWallet = createSelector(
    [getAccounts, getWallet],
    (accounts, wallet) => {
        return accounts.find(account => account.name === wallet)
    }
);