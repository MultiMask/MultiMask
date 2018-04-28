export class Account {
    constructor(wallet) {
        this.wallet = wallet;
        this.name = this.getName();
    }

    getName() {
        return Date.now();
    }

    save() {

    }

    load() {
        
    }
}