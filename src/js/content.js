import log from 'loglevel';
import PortStream from './libs/port-stream';
import PostMessageStream from 'post-message-stream';
import pump from 'pump';

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

  log.info('MultiMask - start listening events');
}

function setupInjection() {
  var s = document.createElement('script');
  s.src = chrome.extension.getURL('inpage.bundle.js');

  var container = document.head || document.documentElement;
  container.insertBefore(s, container.children[0]);

  s.onload = function() {
    s.remove();
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
  pump(backgroundStream, injectStream, backgroundStream);
}
