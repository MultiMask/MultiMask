import { LocalStream } from 'extension-streams';

type InternalMessageResponse = {
  type: string;
  payload: any;
}

export default class InternalMessage {
  public type: string = '';
  public payload: any = '';

  static placeholder() {
    return new InternalMessage();
  }
  static fromJson(json: any) {
    return {
      ...this.placeholder(),
      ...json
    };
  }

  static payload(type: string, payload: any) {
    let p = this.placeholder();
    p.type = type;
    p.payload = payload;
    return p;
  }

  static signal(type: string) {
    let p = this.placeholder();
    p.type = type;
    return p;
  }

  send(): Promise<any> {
    return LocalStream.send(this);
  }
}
