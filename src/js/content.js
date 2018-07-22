import log from 'loglevel';
import PortStream from './libs/port-stream';
import PostMessageStream from 'post-message-stream';
let backgroundStream;
let injectStream;

init();

function init() {
  // eslint-disable-next-line
  log.setLevel(logLevel);

  setupInjection();
  connectToBackend();
  connectToInject();

  setupStreams();
}

function setupInjection() {
  var s = document.createElement('script');
  s.src = chrome.extension.getURL('inpage.bundle.js');

  var container = document.head || document.documentElement;
  container.insertBefore(s, container.children[0]);

  s.onload = function() {
    s.remove();
    log.info('MultiMask - injected handler');
  };
}

function connectToBackend() {
  let backPort = chrome.extension.connect({ name: 'content' });
  backgroundStream = new PortStream(backPort);
}

function connectToInject() {
  injectStream = new PostMessageStream({
    name: 'content',
    target: 'page'
  });
}

function setupStreams() {
  log.info('MultiMask - start listening events');
  injectStream.on('data', data => {
    backgroundStream.write(data);
  });
}
