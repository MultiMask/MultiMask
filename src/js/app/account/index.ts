import uuid from 'uuid/v4';
import { info } from 'loglevel';

export default class Account {
	public wallet: any;
	public blockchain: any;
	public id: any;
	public secret: any;
	public name: any;

	constructor({ wallet, blockchain, name, secret = { seed: null }, id = uuid() }) {
		this.wallet = wallet;
		this.blockchain = blockchain;
		this.id = id;
		this.secret = secret;

		this.name = name ? name : this.createName();
		this.secret.seed = this.create(secret.seed);
	}

	public createName() {
		return Date.now();
	}

	public create(seed) {
		return this.wallet.create(seed);
	}

	public getSeed() {
		return this.secret.seed;
	}

	public getAddress() {
		return this.wallet.getAddress();
	}

	public getInfo() {
		return this.wallet.getInfo().then(info => ({
			id: this.id,
			name: this.name,
			blockchain: this.blockchain,
			info
		}));
	}

	public sendTX(tx) {
		info('Sending tx > ', this.blockchain, this.name, tx);
		return this.wallet.createTX(tx);
	}

	public changeNetwork(network: string) {
		this.wallet.changeNetwork(network, this.secret.seed)
	}

	public serialize() {
		return {
			id: this.id,
			name: this.name,
			blockchain: this.blockchain,
			secret: {
				seed: this.secret.seed
			}
		};
	}
}
