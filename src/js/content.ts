import { EncryptedStream } from 'extension-streams';
import { setLevel, info } from 'loglevel';

import IdGenerator from 'models/IdGenerator';
import InternalMessage from 'services/InternalMessage';
import NetworkMessage from 'services/NetworkMessage';

import { CONTENT_APP, INPAGE_APP } from 'constants/apps';

const INJECT_FILENAME = 'inpage.bundle.js';

class Content {
  public stream;

  constructor () {
    // eslint-disable-next-line
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
   * @param {MessageType} message
   */
  public contentListener (message) {
    const nonSyncMessage = NetworkMessage.fromJson(message);

    // log.info('content receive > ', nonSyncMessage);
    this.sendBackground(nonSyncMessage);
  }

  public sendBackground (message) {
    InternalMessage.payload(message.type, message.payload)
      .send()
      .then(res => this.respond(message, res));
  }

  /**
   * Response from background
   * @param {Message} message
   * @param {Message} response
   */
  public respond (message, payload) {
    // log.info('response < ', message, payload);
    const response = message.respond(payload);

    this.stream.send(response, INPAGE_APP);
  }
}

new Content();
