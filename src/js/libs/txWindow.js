function createWindow({ width = 370, height = 670 }) {
  // TODO: chrome dependency
  chrome.windows.create({
    url: chrome.extension.getURL('dialog.html'),
    type: 'popup',
    focused: true,
    width: width,
    height: height
  });
}

export default createWindow;
