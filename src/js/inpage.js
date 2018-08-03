import log from 'loglevel';

import { EncryptedStream } from 'extension-streams';
import IdGenerator from './libs/IdGenerator';
import MultiWeb from './libs/multiWeb';

import { CONTENT_APP, INPAGE_APP } from './constants/apps';

class Inpage {
  constructor() {
    // eslint-disable-next-line
    log.setLevel(logLevel);

    const stream = new EncryptedStream(INPAGE_APP, IdGenerator.text(64));
    window.multiWeb = new MultiWeb(stream);

    // Syncing the streams between the
    // extension and the web application
    stream.sync(CONTENT_APP, stream.key);
  }
}

new Inpage();
