// import ProfileFactory from './profileFactory';
import { cloneDeep, max } from 'lodash';
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

const DEFAULT_NAME = 'Default wallet';

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

  public decode (decodeFn: (payload) => any) {
    if (this.isEncoded) {
      this.seed = decodeFn(this.seed);
    }
  }

  public getEncodedData (encodeFn: (payload) => string) {
    const clone = cloneDeep(this);
    clone.seed = encodeFn(clone.seed);

    return toJSON(clone);
  }

  public getKeysAndAccounts (): IProfileData {
    return {
      keys: {
        master: this.seed
      },
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

  /**
   * Add new Wallet into profile
   * @param bc 
   */
  public addWallet (bc: BCSign) {
    const chain = this.chains.find(ch => ch.id === bc);
    const idx = this.getLastIndex(bc) + 1;

    if (chain) {
      chain.wallets.push({
        data: `02${idx}`,
        segwit: false,
        name: DEFAULT_NAME
      })
    } else {
      this.chains.push({
        id: bc,
        wallets: [
          {
            data: '020',
            segwit: false,
            name: DEFAULT_NAME
          }
        ]
      })
    }
  }

  private getLastIndex (bc: BCSign) {
    const chain = this.chains.find(ch => ch.id === bc);
    
    if (!chain) {
      return 0;
    } else {
      const indexes = chain.wallets
        .filter(wal => wal.data.substr(0,2) === '02')
        .map(wal => parseInt(wal.data.substr(2), 10));

      return max(indexes);
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
