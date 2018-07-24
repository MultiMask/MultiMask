import PortStream from './port-stream';

class Messaging {
  constructor(name) {
    this.name = name;
    this.init(name);

    this.listeners = {};
  }

  init(name) {
    // TODO: chrome dependency
    const port = chrome.extension.connect({ name });
    this.connectRemote(port);
  }

  connectRemote(remotePort) {
    this.portStream = new PortStream(remotePort);

    this.portStream.on('data', this.fire);
  }

  fire = msg => {
    console.log(`${this.name} recieve: `, msg);
    const { type, payload } = msg;

    if (this.listeners[type] && this.listeners[type].length > 0) {
      this.listeners[type].forEach(fn => fn(payload));
    }
  };

  on(type, cb) {
    if (this.listeners[type]) {
      this.listeners[type].push(cb);
    } else {
      this.listeners[type] = [cb];
    }
  }

  send(msg) {
    console.log(`${this.name} send: `, msg);
    this.portStream.write(msg);
  }
}

export default Messaging;
