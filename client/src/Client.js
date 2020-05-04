import axios from "axios";

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    const error = new Error(`${response.statusText}`);
    error.status = response.statusText;
    error.response = response;
    throw error;
  }
}

function parseData(response) {
  return response.data;
}

export class ArticlesClient {
  getArticle(data) {
    return axios
      .get("http://localhost:3001/api/articles", {
        headers: {
          Accept: "application/json",
        },
      })
      .then(checkStatus)
      .then(parseData)
      .then((res) => res.find((article) => article.id === data.articleId));
  }

  getArticles() {
    return axios
      .get("/api/articles", {
        headers: {
          Accept: "application/json",
        },
      })
      .then(checkStatus)
      .then(parseData);
  }

  getUserArticles(data) {
    return axios
      .get("/api/articles", {
        headers: {
          Accept: "application/json",
        },
      })
      .then(checkStatus)
      .then(parseData)
      .then((res) => res.filter((article) => article.userId === data.userId));
  }

  createArticle(data) {
    return axios
      .post("/api/articles", data, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
      .then(checkStatus)
      .then(parseData);
  }

  updateArticle(data) {
    return axios
      .put("/api/articles", data, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
      .then(checkStatus)
      .then(parseData);
  }

  deleteArticle(data) {
    return axios
      .delete("/api/articles", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        data,
      })
      .then(checkStatus);
  }
}

export class UsersClient {
  getUserById(data) {
    return axios
      .get("/api/users", {
        headers: {
          Accept: "application/json",
        },
      })
      .then(checkStatus)
      .then(parseData)
      .then((res) => res.find((user) => user.id === data.userId));
  }

  verifyUser(data) {
    return axios
      .get("/api/users", {
        headers: {
          Accept: "application/json",
        },
      })
      .then(checkStatus)
      .then(parseData)
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
            id: user.id,
            username: user.username,
            email: user.email,
            registeredSince: user.registeredSince,
          };
        }
      });
  }

  createUser(data) {
    return axios
      .post("/api/users", data, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
      .then(checkStatus)
      .then(parseData);
  }
}
