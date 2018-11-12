import { setLevel } from 'loglevel';
import { EncryptedStream } from 'extension-streams';

import { Crypto3 } from 'libs/crypto3';
import IdGenerator from 'models/IdGenerator';
import { CONTENT_APP, INPAGE_APP } from 'constants/apps';

class Inpage {
  constructor () {
    setLevel(logLevel);

    const stream = new EncryptedStream(INPAGE_APP, IdGenerator.text(64)) as any;
    window.crypto3 = new Crypto3(stream);

    // Syncing the streams between the
    // extension and the web application
    stream.sync(CONTENT_APP, stream.key);
  }
}

// tslint:disable-next-line
new Inpage();
