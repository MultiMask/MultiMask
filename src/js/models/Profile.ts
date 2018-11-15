import { cloneDeep, max } from 'lodash';

import { BCSign } from 'bcnetwork';
import { Randomizer } from 'services/Randomizer';
import { isSeed } from 'helpers/checkers';
import { toJSON, hexToString, stringToHex } from 'helpers/func';
import { getParams, generateId } from 'helpers/profiles';

export interface IWalletRaw {
  data?: string;
  segwit?: boolean;
  extra?: string
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

      this.iterateWallets((wallet, bc) => {
        const [ type, data ] = getParams(wallet.data);

        if (type === '01' || type === '00') {
          wallet.data = `${type}${decodeFn(data)}`;
        }
      })
    }
  }

  public getEncodedData (encodeFn: (payload) => string) {
    const clone = cloneDeep(this);
    clone.seed = encodeFn(clone.seed);

    clone.chains.forEach(chain => {
      chain.wallets.forEach(wallet => {
        const [ type, data ] = getParams(wallet.data);

        if (type === '01' || type === '00') {
          wallet.data = `${type}${encodeFn(data)}`;
        }
      })
    })

    return toJSON(clone);
  }

  public getKeysAndAccounts (): IProfileData {
    return {
      keys: this.getKeys(),
      accounts: this.getAccounts()
    };
  }

  private getAccounts (): IAccountKeyData[] {
    return this.chains.reduce((accounts, chain) => {
      chain.wallets.forEach(wallet => {
        accounts.push({
          ...wallet,
          bc: chain.id,
          key: generateId(chain.id, wallet.data)
        })
      })

      return accounts;
    }, []);
  }

  private getKeys () {
    const keys = {
      master: this.seed,
      seed: {},
      pk: {}
    };

    this.iterateWallets((wallet, bc) => {
      const [ type, key ] = getParams(wallet.data);
      if (type === '00' || type === '01') {
        const dir = type === '00' ? 'pk' : 'seed';
        const pk = type === '00' ? key : hexToString(key);
        
        keys[dir][generateId(bc, wallet.data)] = pk;
      }
    })
    
    return keys;
  }

  /**
   * Add new Wallet into profile
   * @param bc 
   */
  public addWallet (bc: BCSign, pk?: string) {
    const chain = this.chains.find(ch => ch.id === bc);
    const idx = this.getNewIndex(bc);
    const idxImport = !isSeed(pk)
      ? `00${pk}`
      : `01${stringToHex(pk)}`;
    const walletData = {
      data: pk ? idxImport : `02${idx}`,
      segwit: false,
      name: DEFAULT_NAME
    };

    if (chain) {
      chain.wallets.push(walletData)
    } else {
      this.chains.push({
        id: bc,
        wallets: [walletData]
      })
    }
  }

  /**
   * Update info about wallets (name, account, segwit)
   * @param key 
   * @param payload 
   */
  public updateWallet (key, payload) {
    if (payload.data) {
      delete payload.data;
    }

    this.iterateWallets((wallet, bc) => {
      if (generateId(bc, wallet.data) === key) {
        Object.assign(wallet, payload);
      }
    })
  }

  /**
   * Find max index in one chain to generate new wallet
   * @param bc 
   */
  private getNewIndex (bc: BCSign) {
    const chain = this.chains.find(ch => ch.id === bc);
    
    if (!chain) {
      return 0;
    } else {
      const indexes = chain.wallets
        .filter(wal => wal.data.substr(0,2) === '02')
        .map(wal => parseInt(wal.data.substr(2), 10));

      return max(indexes) + 1;
    }
  }

  private iterateWallets (cb: (wallet, bc) => void) {
    this.chains.forEach(chain => {
      chain.wallets.forEach(wallet => {
        cb(wallet, chain.id);
      });
    });
  }

  /**
   * Restore instance from json
   * @param data 
   */
  public static fromJSON (data): Profile {
    return Object.assign(new Profile(''), data);
  }
}
