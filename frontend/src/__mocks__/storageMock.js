global.localStorage = {
  setItem(key, string) {
    global.localStorage[key] = string;
  },
  getItem(key) {
    return global.localStorage[key] || null;
  },
  removeItem(key) {
    delete global.localStorage[key];
  },
  clear() {
    global.localStorage = {};
  }
};
