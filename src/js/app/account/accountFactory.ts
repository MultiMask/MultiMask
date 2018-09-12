import { getEntity, setEntity, removeEntity } from '../../models/getter';
import { encode, decode } from '../../libs/cipher';
import networks from '../../blockchain';
import { debug } from 'loglevel';

import Account from '.';
import BitcoinWallet from './wallet/bitcoin';
import EthWallet from './wallet/eth';

const createWallet = ({ blockchain }) => {
	if (blockchain === networks.BTC.sign) {
		const defaultBTCNetwork = networks.BTC.network[0].sign;
		return new BitcoinWallet(defaultBTCNetwork);
	}

	if (blockchain === networks.ETH.sign) {
		const defaultETHNetwork = networks.ETH.network[0].sign;
		return new EthWallet({ network: defaultETHNetwork });
	}
};

export default {
	create({ name, blockchain, id, secret }: any) {
		const wallet = createWallet({ blockchain });

		return new Account({ wallet, name, blockchain, secret, id });
	},

	save(pass, account) {
		debug('save account > ', pass, account);
		const id = account.id;
		const str = JSON.stringify(account.serialize());
		// eslint-disable-next-line
		const encodedWallet = encryptEntities ? encode(pass, str) : str;

		debug('Account Save > ', encodedWallet);

		setEntity(id, encodedWallet);
	},

	removeList(ids) {
		return Promise.all(ids.map(id => removeEntity(id)));
	},

	load(pass, id) {
		return getEntity(id).then((str: string) => {
			debug('Account Load > raw >', str, id);
			// eslint-disable-next-line
			const decoded = encryptEntities ? JSON.parse(decode(pass, str)) : JSON.parse(str);

			debug('Account Load > ', decoded);

			return this.create(decoded);
		});
	},

	loadListByIds(pass, ids) {
		return Promise.all(ids.map(id => this.load(pass, id)));
	},

	loadListSerializedByIds(pass, ids) {
		return this.loadListByIds(pass, ids).then(result => {
			return result.map((account: any) => account.serialize());
		});
	}
};
