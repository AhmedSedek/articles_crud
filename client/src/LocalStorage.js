const LOGGED_IN_USER_KEY = "ARTICLES_CRUD-LOGGED_IN_USER";

class LocalStorage {
  constructor() {}
  subscribers = [];

  addSubscriber(callback) {
    this.subscribers.push(callback);
  }

  setLoggedInUser(user) {
    localStorage.setItem(LOGGED_IN_USER_KEY, JSON.stringify(user));
    this.subscribers.forEach((subscriber) => subscriber());
  }

  unsetLoggedInUser() {
    localStorage.removeItem(LOGGED_IN_USER_KEY);
    this.subscribers.forEach((subscriber) => subscriber());
  }

  getLoggedInUser() {
    return JSON.parse(localStorage.getItem(LOGGED_IN_USER_KEY));
  }
}

export default new LocalStorage();
