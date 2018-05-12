import PortStream from "../libs/port-stream";

class Messaging {
  listeners = {}

  init() {
    // TODO: chrome dependency
    chrome.extension.onConnect.addListener(port => {
      this.stream = new PortStream(port);

      this.stream.on("data", this.fire);
    });
  }

  fire = msg => {
    console.log("back", msg);
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
    console.log("send mesg", msg);
    this.stream.write(msg);
  }
}

const messaging = new Messaging();
export default messaging;
