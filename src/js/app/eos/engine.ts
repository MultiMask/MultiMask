import Eos from 'eosjs'
const {ecc} = Eos.modules;

import { flatten } from 'helpers/func';

export class EosEngine {
  public static actionParticipants (payload){
    return flatten(
        payload.messages
            .map(message => message.authorization
                .map(auth => `${auth.actor}@${auth.permission}`))
    );
  }

  public static sign (payload, privateKey) {
    return ecc.sign(Buffer.from( payload.buf.data, 'utf8'), privateKey);
  }
}