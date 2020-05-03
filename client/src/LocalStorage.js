const LOGGED_IN_USER_KEY = "ARTICLES_CRUD-LOGGED_IN_USER";

class LocalStorage {
  callbacks = [];

  subscribe(callback) {
    this.callbacks.push(callback);
  }

  setLoggedInUser(user) {
    localStorage.setItem(LOGGED_IN_USER_KEY, JSON.stringify(user));
    this.callbacks.forEach((callback) => callback());
  }

  unsetLoggedInUser() {
    localStorage.removeItem(LOGGED_IN_USER_KEY);
    this.callbacks.forEach((callback) => callback());
  }

  getLoggedInUser() {
    return JSON.parse(localStorage.getItem(LOGGED_IN_USER_KEY)) || {};
  }
}

export default new LocalStorage();
