class Storage {
  constructor() {}

  public get(key): Promise<any> {
    return new Promise(resolve => {
      chrome.storage.local.get(key, function(result) {
        resolve(result[key]);
      });
    });
  }

  public set(key, value): Promise<void> {
    return new Promise(resolve => {
      chrome.storage.local.set({ [key]: value }, function() {
        resolve();
      });
    });
  }

  public remove(key): Promise<void> {
    return new Promise(resolve => {
      chrome.storage.local.remove(key, function() {
        resolve();
      });
    });
  }
}

const storage = new Storage();

export default storage;
