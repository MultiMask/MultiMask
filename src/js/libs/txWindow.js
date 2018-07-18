function createWindow({ width, height }) {
  console.log('show window');
  // TODO: chrome dependency
  chrome.windows.create({
    url: chrome.extension.getURL('dialog.html'),
    type: 'popup',
    focused: true,
    width: width || 350,
    height: height || 600
  });
}

export default createWindow;
