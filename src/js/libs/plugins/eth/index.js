export default class Web3Provider {
  constructor(sendFn) {
    this.send = sendFn;
  }
}
