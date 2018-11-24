import { setLevel } from 'loglevel';

import { BusController } from 'app/busController';
import { AccessController } from 'app/accessController';
import { MessageController } from 'app/messageController';
import { DomainController } from 'app/domainController';
import { CacheController } from 'app/cacheController';

import { KeyController } from 'app/keyController';
import { AccountController } from 'app/account/accountController';
import { ProfileController } from 'app/profiles/profileController';
import { ProfileListController } from 'app/profiles/profileListController';

import { TransactionController } from 'app/transactionController';
import { EthereumController } from 'app/ethereumController';
import { EosController } from 'app/eosController';
import { BtcController } from 'app/btcController';

import { SettingsController } from 'app/settings/settingsController';

class Controller {
  private busController: BusController;
  private accessController: AccessController;
  private messageController: MessageController;
  private domainController: DomainController;
  private keyController: KeyController;
  private cacheController: CacheController;

  private accountController: AccountController;
  private profileController: ProfileController;
  private profileListController: ProfileListController;

  private transactionController: TransactionController;
  private ethereumController: EthereumController;
  private eosController: EosController;
  private btcController: BtcController;

  private settingsController: SettingsController;

  constructor() {
    // Webpack provide this from ./config.json
    setLevel(logLevel);

    this.busController = new BusController();
    this.domainController = new DomainController({
      busController: this.busController
    });

    this.messageController = new MessageController({
      busController: this.busController,
      domainController: this.domainController
    });

    this.accessController = new AccessController({
      busController: this.busController,
      messageController: this.messageController
    });

    this.keyController = new KeyController();
    this.cacheController = new CacheController();

    this.accountController = new AccountController({
      busController: this.busController,
      messageController: this.messageController,
      accessController: this.accessController,
      domainController: this.domainController,
      keyController: this.keyController,
      cacheController: this.cacheController
    });

    this.profileController = new ProfileController({
      busController: this.busController,
      messageController: this.messageController,
      accessController: this.accessController,
      accountController: this.accountController,
      keyController: this.keyController
    });

    this.profileListController = new ProfileListController({
      accessController: this.accessController,
      messageController: this.messageController,
      profileController: this.profileController
    });

    this.settingsController = new SettingsController({
      busController: this.busController,
      messageController: this.messageController,
      accessController: this.accessController
    });

    this.transactionController = new TransactionController({
      messageController: this.messageController,
      accessController: this.accessController,
      accountController: this.accountController
    });

    this.btcController = new BtcController({
      messageController: this.messageController,
      accountController: this.accountController
    });

    this.ethereumController = new EthereumController({
      messageController: this.messageController,
      accountController: this.accountController
    });

    this.eosController = new EosController({
      messageController: this.messageController,
      accountController: this.accountController,
      busController: this.busController,
      keyController: this.keyController
    });

    this.booststrap();
  }

  private booststrap() {
    this.profileListController.init();
    this.cacheController.init();
  }
}

// tslint:disable-next-line
new Controller();
