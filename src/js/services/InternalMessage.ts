import { LocalStream } from 'extension-streams';

interface InternalMessageResponse {
  type: string;
  payload: any;
}

export default class InternalMessage {
  public type: string;
  public payload: any;

  public static placeholder () {
    return new InternalMessage();
  }
  public static fromJson (json: any) {
    return {
      ...this.placeholder(),
      ...json
    };
  }

  public static payload (type: string, payload: any) {
    const p = this.placeholder();
    p.type = type;
    p.payload = payload;
    return p;
  }

  public static signal (type: string) {
    const p = this.placeholder();
    p.type = type;
    return p;
  }

  public send (): Promise<any> {
    return LocalStream.send(this);
  }
}
