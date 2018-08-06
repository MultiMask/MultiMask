export default class Web3Provider {
  constructor({ stream }) {
    this.stream = stream;
  }

  init() {
    this.stream.send({
      type: 'eth:init'
    });
  }

  listeners() {
    console.log('start listening');
    this.stream.listenWith(data => {
      console.log('receive data on page', data);
    });
  }
}
