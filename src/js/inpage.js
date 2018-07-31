import log from 'loglevel';

import PostMessageStream from 'post-message-stream';
import MultiWeb from './libs/multiWeb';

let contentStream;

init();

function init() {
  // eslint-disable-next-line
  log.setLevel(logLevel);

  conntectToContent();
  injectScript();

  log.info('MultiMask - injected handler');
}

function conntectToContent() {
  contentStream = new PostMessageStream({
    name: 'page',
    target: 'content'
  });
}

function injectScript() {
  window.multiWeb = new MultiWeb({
    stream: contentStream
  });
}
