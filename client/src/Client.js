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
  getArticle(data, success) {
    return fetch("/api/articles", {
      headers: {
        Accept: "application/json",
      },
    })
      .then(checkStatus)
      .then(parseJSON)
      .then((res) => res.find((article) => article.id === data.articleId))
      .then(success);
  }
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

  getUserById(data, success) {
    return fetch("/api/users", {
      headers: {
        Accept: "application/json",
      },
    })
      .then(checkStatus)
      .then(parseJSON)
      .then((res) => res.find((user) => user.id === data.userId))
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

  verifyUser(data) {
    return fetch("/api/users", {
      headers: {
        Accept: "application/json",
      },
    })
      .then(checkStatus)
      .then(parseJSON)
      .then((res) => {
        const user = res.find(
          (user) =>
            user.username === data.username && user.password === data.password
        );
        if (!user) {
          const error = new Error("Invalid Username or Password");
          error.status = 400;
          error.response = res;
          throw error;
        } else {
          return {
            username: user.username,
            email: user.email,
            registeredSince: user.registeredSince,
          };
        }
      });
  }

  getUserArticles(data, success) {
    return fetch("/api/articles", {
      headers: {
        Accept: "application/json",
      },
    })
      .then(checkStatus)
      .then(parseJSON)
      .then((res) => res.filter((article) => article.id === data.userId))
      .then(success);
  }

  createArticle(data) {
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
