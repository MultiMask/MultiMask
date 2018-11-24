export default class Network {
  public name;
  public protocol;
  public host;
  public port;
  public blockchain;
  public chainId;

  constructor(_name = '', _protocol = 'https', _host = '', _port: any = 0, blockchain = 'EOS', chainId = '') {
    this.name = _name;
    this.protocol = _protocol;
    this.host = _host;
    this.port = _port;
    this.blockchain = blockchain;
    this.chainId = chainId.toString();
  }

  public static placeholder() {
    return new Network();
  }

  public static fromJson(json) {
    const p = Object.assign(Network.placeholder(), json);
    p.chainId = p.chainId ? p.chainId.toString() : '';
    return p;
  }

  public static fromUnique(netString) {
    const blockchain = netString.split(':')[0];
    if (netString.indexOf(':chain:') > -1) {
      return new Network('', '', '', '', blockchain, netString.replace(`${blockchain}:chain:`, ''));
    }

    const splits = netString.replace(`${blockchain}:`, '').split(':');
    return new Network('', '', splits[0], parseInt(splits[1] || 80), blockchain);
  }

  public unique() {
    return (
      `${this.blockchain}:` + (this.chainId.length ? `chain:${this.chainId}` : `${this.host}:${this.port}`)
    ).toLowerCase();
  }
  public hostport() {
    return `${this.host}${this.port ? ':' : ''}${this.port}`;
  }
  public clone() {
    return Network.fromJson(JSON.parse(JSON.stringify(this)));
  }
  public isEmpty() {
    return !this.host.length;
  }
  public isValid() {
    return (this.host.length && this.port) || this.chainId.length;
  }
}
