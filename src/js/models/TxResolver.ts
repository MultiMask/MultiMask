export class TXModel {
  public data;
  public id;
  public resolver;

  constructor (data, id, resolver) {
    this.data = data;
    this.id = id;
    this.resolver = resolver;
  }

  public updateTX (data) {
    this.data.tx = {
      ...this.data.tx,
      ...data
    };

    return this;
  }

  public toJSON () {
    return {
      data: this.data,
      id: this.id
    };
  }

  public resolve () {
    this.resolver(this.data.tx);

    return this;
  }
}
