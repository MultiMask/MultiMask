import log from 'loglevel';

import { EncryptedStream } from 'extension-streams';
import IdGenerator from './libs/IdGenerator';
// import PostMessageStream from 'post-message-stream';
import MultiWeb from './libs/multiWeb';

import { CONTENT_APP, INPAGE_APP } from './constants/apps';
// let contentStream;

// init();

// function init() {
//   conntectToContent();
//   injectScript();

//   log.info('MultiMask - injected handler');
// }

// function conntectToContent() {
//   contentStream = new PostMessageStream({
//     name: 'page',
//     target: 'content'
//   });
// }

// function injectScript() {
//   window.multiWeb = new MultiWeb({
//     stream: contentStream
//   });
// }

class Inpage {
  constructor() {
    // eslint-disable-next-line
    log.setLevel(logLevel);

    const stream = new EncryptedStream(INPAGE_APP, IdGenerator.text(64));

    // Waiting for scatter to push itself onto the application
    stream.listenWith(msg => {
      // if (msg && msg.hasOwnProperty('type') && msg.type === NetworkMessageTypes.PUSH_SCATTER)
      //   window.scatter = new Scatterdapp(stream, msg.payload);
      log.info('get msg', msg);
      window.multiWeb = new MultiWeb({ stream });
    });

    // Syncing the streams between the
    // extension and the web application
    stream.sync(CONTENT_APP, stream.key);
  }
}

new Inpage();
