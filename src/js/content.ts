import { EncryptedStream } from 'extension-streams';
import { setLevel, info } from 'loglevel';

import IdGenerator from 'models/IdGenerator';
import { NetworkMessage } from 'models/NetworkMessage';
import InternalMessage from 'services/InternalMessage';
import { CONTENT_APP, INPAGE_APP } from 'constants/apps';
import { strippedHost } from 'helpers/net';

const INJECT_FILENAME = 'inpage.bundle.js';

class Content {
  public stream;

  constructor () {
    setLevel(logLevel);

    this.setupInpageStream();
    this.injectScript();

    info('MultiMask - start listening events');
  }

  /**
   * Create encrypted strem to inject script in user page
   */
  public setupInpageStream () {
    this.stream = new EncryptedStream(CONTENT_APP, IdGenerator.text(256));
    this.stream.listenWith(msg => this.contentListener(msg));

    this.stream.onSync(() => { });
  }

  /**
   * Inject script to user page
   */
  public injectScript () {
    const s = document.createElement('script');
    const container = document.head || document.documentElement;

    s.src = chrome.extension.getURL(INJECT_FILENAME);
    container.insertBefore(s, container.children[0]);

    s.onload = () => s.remove();
  }

  /**
   * Listing injected messages
   * @param message
   */
  public contentListener (message) {
    const nonSyncMessage = NetworkMessage.fromJson({
      ...message,
      domain: strippedHost()
    });
    this.sendBackground(nonSyncMessage);
  }

  public sendBackground (message: NetworkMessage) {
    InternalMessage.payload(message.type, message)
      .send()
      .then(res => this.respond(message, res));
  }

  /**
   * Response from background
   * @param {Message} message
   * @param {Message} response
   */
  public respond (message, backResponse) {
    const response = backResponse && backResponse.type === 'error'
      ? message.error({ error: backResponse.error })
      : message.respond(backResponse);

    this.stream.send(response, INPAGE_APP);
  }
}

// tslint:disable-next-line
new Content();
