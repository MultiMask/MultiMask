export class NetworkMessage {
  public type;
  public payload;
  public resolver;
  public domain;

  constructor(type = '', payload = {}, resolver = '', domain = '') {
    this.type = type;
    this.payload = payload;
    this.resolver = resolver;
    this.domain = domain;
  }

  public static placeholder() {
    return new NetworkMessage();
  }
  public static fromJson(json) {
    const p = Object.assign(this.placeholder(), json);
    return p;
  }

  public static payload(type, payload) {
    const p = this.placeholder();
    p.type = type;
    p.payload = payload;
    return p;
  }

  public static signal(type) {
    const p = this.placeholder();
    p.type = type;
    return p;
  }

  public respond(payload) {
    return new NetworkMessage(this.type, payload, this.resolver);
  }
  public error(payload) {
    return new NetworkMessage('error', payload, this.resolver);
  }
}
