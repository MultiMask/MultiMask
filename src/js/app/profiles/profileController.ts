import { info } from 'loglevel';

import { ProfileListController } from './profileListController';
import ProfileFactory from './profileFactory';

import { AccessController } from './../accessController';
import { MessageController } from './../messageController';

import {AccountController} from './../account/accountController';
import AccountFactory from './../account/accountFactory';
import { Profile } from './Profile';

import { ACCOUNT_INFO, ACCOUNT_CREATE, ACCOUNT_GETSEED } from './../../constants/account';
import { PROFILE_SELECT } from './../../constants/profile';

export class ProfileController {
	private accessController: AccessController;
	private messageController: MessageController;

	private profileListController: ProfileListController;
	private accountController: AccountController;

	constructor(opts) {
		this.accessController = opts.accessController;
		this.messageController = opts.messageController;
		
		this.accountController = opts.accountController;
		this.profileListController =  opts.profileListController;

		this.startListening();
	}

	/**
   * Messages
   */
	private startListening() {
		this.messageController.on(ACCOUNT_INFO, this.getAccounts);
		this.messageController.on(ACCOUNT_CREATE, this.addAccount);
		this.messageController.on(ACCOUNT_GETSEED, this.getSeed);

		this.profileListController.on(PROFILE_SELECT, this.restoreProfile);
	}

	private getPass() {
		return this.accessController.getPass();
	}

	/**
   * Return accounts for current Profile
   * @param sendResponse
   */
	public getAccounts = (sendResponse): void => {
		const resolver = this.profileListController.getCurrent()
			? Promise.resolve(this.accountController.getAccounts())
			: this.init();

		resolver
			.then(accounts => {
				return Promise.all(accounts.map(account => account.getInfo()));
			})
			.then(sendResponse);
	}

	/**
   * Get profiles list and restore first or create new
   */
	private init() {
		return this.profileListController.init()
			.then(this.restoreProfile);
	}

	/**
   * Restore all accounts from Profile
   * @param {Profile} profile
   */
	private restoreProfile = (profile: Profile) => {
		info('Profile changed > ', profile);
		return this.restoreAccounts(profile.getAccounts());
	}

	/**
   * Restore all accounts from store
   * @param accountIds
   */
	private restoreAccounts = (accountIds: string[]) => {
		this.accountController.clearList();
		return this.accountController.restore(accountIds, this.getPass());
	}

	/**
   * Create new account in with profile with data
   * @param sendResponse 
   * @param accountData 
   */
	public addAccount = (sendResponse, accountData): void => {   
		const profile = this.profileListController.getCurrent();
		const account = AccountFactory.create(accountData);

		profile.addAccount(this.getPass(), account).then(() => {
			AccountFactory.save(this.getPass(), account);
			this.accountController.addAccountInstance(account);

			this.getAccounts(sendResponse);
		});
	}

	/**
   * Return seed for Wallet to export
   * @param sendResponse 
   * @param id 
   */
	public getSeed = (sendResponse, id): void => {
		sendResponse(this.accountController.getSeed(id));
	}
}
