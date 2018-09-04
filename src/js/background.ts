import { setLevel } from 'loglevel';

import { AccessController } from './app/accessController';
import { MessageController } from './app/messageController';

import { AccountController } from './app/account/accountController';
import { ProfileController } from './app/profiles/profileController';
import { ProfileListController } from './app/profiles/profileListController';

import { TransactionController } from './app/transactionController';
import { EthereumController } from './app/ethereumController';

import { SettingsController } from './app/settings/settingsController';

class Controller {
	private accessController: AccessController;
	private messageController: MessageController;
	
	private accountController: AccountController;
	private profileController: ProfileController;
	private profileListController: ProfileListController;

	private transactionController: TransactionController;
	private ethereumController: EthereumController;

	private settingsController: SettingsController;

	constructor() {
		// Set from settings in ./config.json
		setLevel(logLevel);

		this.messageController = new MessageController();

		this.accessController = new AccessController({
			messageController: this.messageController
		});

		this.accountController = new AccountController({
			messageController: this.messageController,
			accessController: this.accessController
		});

		this.profileListController = new ProfileListController({
			messageController: this.messageController,
			accessController: this.accessController,
			accountController: this.accountController,
		});

		this.profileController = new ProfileController({
			messageController: this.messageController,
			accessController: this.accessController,
			accountController: this.accountController,
			profileListController: this.profileListController,
		});

		this.settingsController = new SettingsController({
			messageController: this.messageController,
			accessController: this.accessController,
		});

		this.transactionController = new TransactionController({
			messageController: this.messageController,
			accessController: this.accessController,
			accountController: this.accountController,
		});
		
		this.ethereumController = new EthereumController({
			messageController: this.messageController,
			accessController: this.accessController,
			accountController: this.accountController,
			transactionController: this.transactionController,
		});
	}
}

new Controller();
