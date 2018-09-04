class Storage {
  constructor() { }

  get(key): Promise<any> {
    return new Promise(resolve => {
      chrome.storage.local.get(key, function (result) {
        resolve(result[key]);
      });
    });
  }

  set(key, value): Promise<void> {
    return new Promise(resolve => {
      chrome.storage.local.set({ [key]: value }, function () {
        resolve();
      });
    });
  }

  remove(key): Promise<void> {
    return new Promise(resolve => {
      chrome.storage.local.remove(key, function () {
        resolve();
      });
    });
  }
}

const storage = new Storage();

export default storage;
