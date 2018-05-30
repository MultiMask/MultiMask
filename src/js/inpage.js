import PostMessageStream from 'post-message-stream';
import BitWeb from './libs/bitWeb';
let contentStream;

console.log('inpage script');

init();

function init() {
  conntectToContent();
  injectScript();
};

function conntectToContent() {
  contentStream = new PostMessageStream({
    name: 'page',
    target: 'content',
  })
  // contentStream.on('data', (data) => console.log('recieved inpage', data))
  // contentStream.write('send from inpage');
}

function injectScript() {
  window.bitWeb = new BitWeb({
    stream: contentStream
  });
}
