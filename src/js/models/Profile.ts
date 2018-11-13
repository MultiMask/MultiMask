// import ProfileFactory from './profileFactory';
import { cloneDeep } from 'lodash';
import { Randomizer } from 'services/Randomizer';
import { isSeed } from 'helpers/checkers';
import { toJSON } from 'helpers/func';
import { BCSign } from 'bcnetwork';

export interface IWalletRaw {
  data?: string;
  segwit?: boolean;
  name?: string;
}

export interface IProfileChain {
  id: BCSign;
  wallets: IWalletRaw[];
}

export class Profile {
  private seed: string;

  public id: string;
  public version = 0x0;
  public chains: IProfileChain[] = [];

  constructor (seed: string) {
    this.seed = seed;
    this.id = Randomizer.hex();
  }

  public isEncoded (): boolean {
    return !isSeed(this.seed);
  }

  public getEncodedData (encodeFn: (payload) => string) {
    const clone = cloneDeep(this);
    clone.seed = encodeFn(clone.seed);

    return toJSON(clone);
  }

  public getKeysAndAccounts (decodeFn: (payload) => any): IProfileData {
    const keys = {
      master: decodeFn(this.seed),
    };

    return {
      keys,
      accounts: this.getAccounts()
    }
  }

  private getAccounts (): IAccountKeyData[] {
    return this.chains.reduce((accounts, chain) => {
      chain.wallets.forEach(wallet => {
        accounts.push({
          ...wallet,
          bc: chain.id
        })
      })

      return accounts;
    }, []);
  }

  public addWallet (bc: BCSign) {
    const chain = this.chains.find(ch => ch.id === bc);

    if (chain) {

    } else {
      this.chains.push({
        id: bc,
        wallets: [
          {
            data: '0200',
            segwit: false,
            name: 'Default wallet'
          }
        ]
      })
    }
  }

  public static fromJSON (data): Profile {
    return Object.assign(new Profile(''), data);
  }
  
  // public getId () {
  //   return this.data.id;
  // }

  // public getAccounts () {
  //   return this.data.accounts;
  // }

  // public addAccount (pass, account) {
  //   this.data.accounts.push(account.id);
  //   this.increaceVerion();
  //   return this.save(pass);
  // }

  // public increaceVerion () {
  //   this.data.version = this.data.version + 1;
  // }

  // public save (pass) {
  //   return ProfileFactory.save(pass, this);
  // }

  // public update (pass, newData) {
  //   this.data = { ...this.data, ...newData };
  //   this.increaceVerion();
  //   return this.save(pass);
  // }

  // public serialize () {
  //   return {
  //     ...this.data
  //   };
  // }
}
