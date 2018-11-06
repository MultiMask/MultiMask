import { setLevel } from 'loglevel';

import { BusController } from './app/busController';
import { AccessController } from './app/accessController';
import { MessageController } from './app/messageController';
import { DomainController } from './app/domainController';

import { AccountController } from './app/account/accountController';
import { ProfileController } from './app/profiles/profileController';
import { ProfileListController } from './app/profiles/profileListController';

import { TransactionController } from './app/transactionController';
import { EthereumController } from './app/ethereumController';
import { EosController } from './app/eos';
import { BtcController } from './app/btcController';

import { SettingsController } from './app/settings/settingsController';

class Controller {
  private busController: BusController;
  private accessController: AccessController;
  private messageController: MessageController;
  private domainController: DomainController;
  
  private accountController: AccountController;
  private profileController: ProfileController;
  private profileListController: ProfileListController;

  private transactionController: TransactionController;
  private ethereumController: EthereumController;
  private eosController: EosController;
  private btcController: BtcController;
  
  private settingsController: SettingsController;

  constructor () {
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
      messageController: this.messageController,
    });

    this.accountController = new AccountController({
      busController: this.busController,
      messageController: this.messageController,
      accessController: this.accessController,
      domainController: this.domainController
    });

    this.profileListController = new ProfileListController({
      busController: this.busController,
      messageController: this.messageController,
      accessController: this.accessController,
      accountController: this.accountController,
    });

    this.profileController = new ProfileController({
      busController: this.busController,
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
    
    this.btcController = new BtcController({
      messageController: this.messageController,
      accessController: this.accessController,
      accountController: this.accountController
    });

    this.ethereumController = new EthereumController({
      messageController: this.messageController,
      accessController: this.accessController,
      accountController: this.accountController
    });

    this.eosController = new EosController({
      messageController: this.messageController,
      accessController: this.accessController,
      accountController: this.accountController,
    })
  }
}

// tslint:disable-next-line
new Controller();
