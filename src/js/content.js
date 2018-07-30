import { EncryptedStream } from 'extension-streams';
import IdGenerator from './libs/IdGenerator';
import log from 'loglevel';

import { CONTENT_APP, INPAGE_APP } from './constants/apps';

const INJECT_FILENAME = 'inpage.bundle.js';

class Content {
  stream;

  constructor() {
    // eslint-disable-next-line
    log.setLevel(logLevel);

    this.setupInpageStream();
    this.injectScript();

    //
    this.stream.send(
      {
        type: 'try',
        payload: {}
      },
      INPAGE_APP
    );

    log.info('MultiMask - start listening events');
  }

  /**
   * Create encrypted strem to inject script in user page
   */
  setupInpageStream() {
    this.stream = new EncryptedStream(CONTENT_APP, IdGenerator.text(256));
    this.stream.listenWith(msg => this.contentListener(msg));

    this.stream.onSync(() => {});
  }

  /**
   * Inject script to user page
   */
  injectScript() {
    const s = document.createElement('script');
    const container = document.head || document.documentElement;

    s.src = chrome.extension.getURL(INJECT_FILENAME);
    container.insertBefore(s, container.children[0]);

    s.onload = () => s.remove();
  }

  /**
   * Listing injected messages
   * @param {MessageType} msg
   */
  contentListener(msg) {
    log.info(msg);
  }
}

new Content();
