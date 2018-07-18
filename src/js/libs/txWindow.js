function createWindow({ width, height }) {
  console.log('show window');
  // TODO: chrome dependency
  chrome.windows.create({
    url: chrome.extension.getURL('dialog.html'),
    type: 'popup',
    focused: true,
    width: width || 360,
    height: height || 670
  });
}

export default createWindow;
