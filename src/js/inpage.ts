import { setLevel } from 'loglevel';
import { EncryptedStream } from 'extension-streams';

import { MultiWeb } from 'libs/multiWeb';
import { Randomizer } from 'services/Randomizer';
import { CONTENT_APP, INPAGE_APP } from 'constants/apps';

class Inpage {
  constructor () {
    setLevel(logLevel);

    const stream = new EncryptedStream(INPAGE_APP, Randomizer.text(64)) as any;
    window.multiWeb = new MultiWeb(stream);

    // Syncing the streams between the
    // extension and the web application
    stream.sync(CONTENT_APP, stream.key);
  }
}

// tslint:disable-next-line
new Inpage();
