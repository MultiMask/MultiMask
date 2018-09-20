import { error } from 'loglevel';

import { getSettings, setSettings } from 'services/getter';
import ntx from 'bcnetwork';

import { AccessController } from './../accessController';
import { MessageController } from './../messageController';

import {
  SETTINGS_LOAD_CURRENCY_PRICE,
  SETTINGS_LOAD_CURRENCY_PRICE_FAIL,
  SETTINGS_LOAD_CURRENCY_PRICE_SUCCESS
} from 'constants/settings';

import priceProviders from './priceProviders';

export class SettingsController {
  private accessController: AccessController;
  private messageController: MessageController;

  public priceProviders;
  public priceProvider;

  private settings = {};

  private defaultSettings = {
    price_provider: 'coinmarketcap',
    show_total: true
  };

  constructor (opts) {
    this.accessController = opts.accessController;
    this.messageController = opts.messageController;

    this.priceProviders = priceProviders;

    this.usePriceProvider();
    this.startListening();
  }

  private startListening () {
    this.messageController.on(SETTINGS_LOAD_CURRENCY_PRICE, async (sendResponse) => {
      try {
        const signs = Object.values(ntx).map(i => i.sign);
        let prices;

        await Promise.all(signs.map(sign => this.loadPrice(sign, { convert: 'BTC' })))
          .then(res => {
            if (Array.isArray(res)) {
              prices = res.reduce((acc, v, i) => {
                acc[signs[i]] = v;
                return acc;
              }, {});
            }
          })
          .catch(err => {
            error(err);
          });

        sendResponse({
          type: SETTINGS_LOAD_CURRENCY_PRICE_SUCCESS,
          payload: {
            prices,
            providers: this.getPriceProviders()
          }
        });
      } catch (err) {
        error('error loading price', err);

        sendResponse({
          type: SETTINGS_LOAD_CURRENCY_PRICE_FAIL
        });
      }

    });
  }

  public loadPrice (sign, convertTo) {
    if (!this.priceProvider) return Promise.reject('priceProvider not defined');

    return this.priceProvider.getBCPrice(sign, convertTo);
  }

  public getAll () {
    const {
      price_provider = this.defaultSettings.price_provider,
      show_total = this.defaultSettings.show_total
    } = this.settings as any;
    return { price_provider, show_total };
  }

  public getByKey (settingKey) {
    const settings = this.getAll();
    return settings && settings[settingKey];
  }

  public setByKey (settingKey, settingValue) {
    switch (settingKey) {
      case 'price_provider':
      case 'show_total':
        this.settings[settingKey] = settingValue;
        break;
      default:
    }
  }

  public setAll (nextSettings) {
    if (this.checkAuth) {
      this.settings = nextSettings;
    }
  }

  public clearAll () {
    if (this.checkAuth) {
      this.settings = {};
    }
  }

  get checkAuth () {
    return this.accessController && this.accessController.isAuth();
  }

  public getPriceProviders () {
    return Object.entries(this.priceProviders).map((ent: any) => ({ value: ent[0], label: ent[1].title }));
  }

  public usePriceProvider () {
    const price_provider = this.getByKey('price_provider');

    if (price_provider && this.priceProviders[price_provider]) {
      this.priceProvider = new this.priceProviders[price_provider].class();
    }
  }
}
