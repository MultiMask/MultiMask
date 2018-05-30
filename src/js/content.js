import PortStream from "./libs/port-stream";
import PostMessageStream from "post-message-stream";
let backgroundStream;
let injectStream;

console.log("content js");

// Inject inpage script
init();

function init() {
  setupInjection();
  connectToBackend();
  connectToInject();

  setupStreams();
}

function setupInjection() {
  var s = document.createElement("script");
  s.src = chrome.extension.getURL("inpage.bundle.js");

  var container = document.head || document.documentElement;
  container.insertBefore(s, container.children[0]);

  s.onload = function () {
    s.remove();
  };
}

function connectToBackend() {
  let backPort = chrome.extension.connect({ name: "content" });
  backgroundStream = new PortStream(backPort);
  // backgroundStream.write('hello from content');
  // backgroundStream.on('data', (data) => console.log('recieved content: ', data));
}

function connectToInject() {
  injectStream = new PostMessageStream({
    name: "content",
    target: "page"
  });
  // injectStream.on('data', (data) => console.log('recieved content', data))
  // injectStream.write('send from content')
}

function setupStreams() {
  injectStream.on("data", data => {
    backgroundStream.write(data);
  });
}
