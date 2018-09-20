export class Prompt {
  public type;
  public domain;
  public network;
  public data;
  public responder;

  constructor (_type = '', _domain = '', _network = null, _data = {}, _responder = null){
    this.type = _type;
    this.domain = _domain;
    this.network = _network;
    this.data = _data;
    this.responder = _responder;
  }

  public static placeholder (){ return new Prompt(); }
  public static fromJson (json){ return Object.assign(this.placeholder(), json); }

  public routeName (){
      return this.type;
  }
}