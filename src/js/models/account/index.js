export default class Account {
    constructor(wallet, network) {
        this.network = network;
        this.wallet = wallet;

        this.name = this.getName();
    }

    getName() {
        return Date.now();
    }

    create(seed) {
        this.wallet.create(seed);

        return this.wallet.getSeed();
    }

    getInfo() {
        return this.wallet.getInfo()
            .then(info => ({
                name: this.name,
                network: this.network,
                info,
            }))
    }
}