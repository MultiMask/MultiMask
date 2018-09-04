class Storage {
  constructor() { }

  get(key) {
    // console.log('get>', key);
    return new Promise(resolve => {
      chrome.storage.local.get(key, function (result) {
        // console.log('get:', result[key]);
        resolve(result[key]);
      });
    });
  }

  set(key, value) {
    // console.log('set:', key, value);
    return new Promise(resolve => {
      chrome.storage.local.set({ [key]: value }, function () {
        // console.log('set: done');
        resolve();
      });
    });
  }

  remove(key) {
    // console.log('remove:', key);
    return new Promise(resolve => {
      chrome.storage.local.remove(key, function () {
        // console.log('remove: done');
        resolve();
      });
    });
  }
}

const storage = new Storage();

export default storage;
