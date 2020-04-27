/* eslint-disable no-console */
/* eslint-disable no-undef */

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    const error = new Error(`HTTP Error ${response.statusText}`);
    error.status = response.statusText;
    error.response = response;
    console.log(error);
    throw error;
  }
}

function parseJSON(response) {
  return response.json();
}

class Client {
  getArticles(success) {
    return fetch("/api/articles", {
      headers: {
        Accept: "application/json",
      },
    })
      .then(checkStatus)
      .then(parseJSON)
      .then(success);
  }

  getUsers(success) {
    return fetch("/api/users", {
      headers: {
        Accept: "application/json",
      },
    })
      .then(checkStatus)
      .then(parseJSON)
      .then(success);
  }

  createArticle(data) {
    console.log(JSON.stringify(data));
    return fetch("/api/articles", {
      method: "post",
      body: JSON.stringify(data),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }).then(checkStatus);
  }

  createUser(data) {
    console.log(JSON.stringify(data));
    return fetch("/api/users", {
      method: "post",
      body: JSON.stringify(data),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }).then(checkStatus);
  }

  updateArticle(data) {
    return fetch("/api/articles", {
      method: "put",
      body: JSON.stringify(data),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }).then(checkStatus);
  }

  deleteArticle(data) {
    return fetch("/api/articles", {
      method: "delete",
      body: JSON.stringify(data),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }).then(checkStatus);
  }
}

export default Client;
