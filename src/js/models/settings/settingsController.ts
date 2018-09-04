import { getSettings, setSettings } from '../getter';

import priceProviders from './priceProviders';

export default class SettingsController {
  public App;
  public priceProviders;
  public priceProvider;

  constructor({ App }) {
    this.App = App;
    this.priceProviders = priceProviders;

    this.usePriceProvider();
  }

  loadPrice(sign, convertTo) {
    if (!this.priceProvider) return Promise.reject('priceProvider not defined');

    return this.priceProvider.getBCPrice(sign, convertTo);
  }

  getAll() {
    if (this.checkAuth) {
      const {
        price_provider = this.defaultSettings.price_provider,
        show_total = this.defaultSettings.show_total
      } = this.settings as any;
      return { price_provider, show_total };
    }
  }

  getByKey(settingKey) {
    if (this.checkAuth) {
      const settings = this.getAll();
      return settings && settings[settingKey];
    }

    return void 0;
  }

  setByKey(settingKey, settingValue) {
    switch (settingKey) {
      case 'price_provider':
      case 'show_total':
        this.settings[settingKey] = settingValue;
        break;
      default:
    }
  }

  setAll(nextSettings) {
    if (this.checkAuth) {
      this.settings = nextSettings;
    }
  }

  clearAll() {
    if (this.checkAuth) {
      this.settings = {};
    }
  }

  get checkAuth() {
    return this.App && this.App.isAuth();
  }

  getPriceProviders() {
    return Object.entries(this.priceProviders).map((ent: any) => ({ value: ent[0], label: ent[1].title }));
  }

  settings = {};

  defaultSettings = {
    price_provider: 'coinmarketcap',
    show_total: true
  };

  usePriceProvider() {
    const price_provider = this.getByKey('price_provider');

    if (price_provider && this.priceProviders[price_provider]) {
      this.priceProvider = new this.priceProviders[price_provider].class();
    }
  }
}
