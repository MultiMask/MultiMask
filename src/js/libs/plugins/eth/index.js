export default class Web3Provider {
  constructor({ stream }) {
    this.stream = stream;
  }

  init() {
    this.stream.write({
      type: 'eth:init'
    });
  }

  listeners() {
    console.log('start listening');
    this.stream.on('data', data => {
      console.log('receive data on page', data);
    });
  }
}
