// import { LocalStream } from 'extension-streams';
import { setLevel } from 'loglevel';

import { AccessController } from './app/accessController';
import { MessageController } from './app/messageController';

import { AccountController } from './app/account/accountController';
import { ProfileController } from './app/profiles/profileController';
import { ProfileListController } from './app/profiles/profileListController';

import { TransactionController } from './app/transactionController';
import { EthereumController } from './app/ethereumController';

import { SettingsController } from './app/settings/settingsController';

// import listeners from './background/listeners';
// import App from './models/app';

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

		// App.bootstrap();
		// this.setupInternalMessaging({ App });

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

	// setupInternalMessaging(opts) {
	//   const watcher = listeners(opts);

	//   LocalStream.watch(watcher);
	// }
}

new Controller();
