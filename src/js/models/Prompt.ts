export class Prompt implements IPrompt {
  public type;
  public domain;
  public network;
  public data;
  public responder;

  constructor (type = '', {
    domain = '',
    network = null,
    data = {},
    responder = null}: IPromptConstruct = null
  ){
    this.type = type;
    this.domain = domain;
    this.network = network;
    this.data = data;
    this.responder = responder;
  }

  public static placeholder (){ return new Prompt(); }
  public static fromJson (json){ return Object.assign(this.placeholder(), json); }

  public routeName (){
      return this.type;
  }
}