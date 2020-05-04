const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");
const uuid = require("uuid");

const app = express();

const ARTICLES_FILE = path.join(__dirname, "articles.json");
const USERS_FILE = path.join(__dirname, "users.json");

app.set("port", process.env.PORT || 3001);

app.use("/", express.static(path.join(__dirname, "public")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
  res.setHeader("Pragma", "no-cache");
  res.setHeader("Expires", "0");
  next();
});

app.get("/api/articles", (req, res) => {
  fs.readFile(ARTICLES_FILE, (err, data) => {
    res.setHeader("Cache-Control", "no-cache");
    res.json(JSON.parse(data));
  });
});

app.get("/api/users", (req, res) => {
  fs.readFile(USERS_FILE, (err, data) => {
    res.setHeader("Cache-Control", "no-cache");
    res.json(JSON.parse(data));
  });
});

app.post("/api/articles", (req, res) => {
  fs.readFile(ARTICLES_FILE, (err, data) => {
    const articles = JSON.parse(data);
    const newArticle = {
      title: req.body.title,
      id: uuid.v4(),
      timeCreated: Date.now(),
      timeUpdated: Date.now(),
      content: req.body.content,
      userId: req.body.userId,
      username: req.body.username,
    };
    articles.push(newArticle);
    fs.writeFile(ARTICLES_FILE, JSON.stringify(articles, null, 2), () => {
      res.setHeader("Cache-Control", "no-cache");
      res.json(newArticle);
    });
  });
});

app.post("/api/users", (req, res) => {
  fs.readFile(USERS_FILE, (err, data) => {
    const users = JSON.parse(data);
    const newUser = {
      username: req.body.username,
      id: uuid.v4(),
      registeredSince: Date.now(),
      password: req.body.password,
      email: req.body.email,
    };
    if (users.filter((user) => user.username == newUser.username).length) {
      res.statusMessage = `Username ${newUser.username} exists before`;
      res.status(400);
      res.send();
    } else {
      users.push(newUser);
      fs.writeFile(USERS_FILE, JSON.stringify(users, null, 2), () => {
        res.setHeader("Cache-Control", "no-cache");
        res.json(newUser);
      });
    }
  });
});

app.put("/api/articles", (req, res) => {
  fs.readFile(ARTICLES_FILE, (err, data) => {
    const articles = JSON.parse(data);
    articles.forEach((article) => {
      if (article.id === req.body.id) {
        article.title = req.body.title;
        article.content = req.body.content;
        article.timeUpdated = Date.now();
      }
    });
    fs.writeFile(ARTICLES_FILE, JSON.stringify(articles, null, 2), () => {
      res.json({});
    });
  });
});

app.delete("/api/articles", (req, res) => {
  fs.readFile(ARTICLES_FILE, (err, data) => {
    let articles = JSON.parse(data);
    articles = articles.reduce((memo, article) => {
      if (article.id === req.body.id) {
        return memo;
      } else {
        return memo.concat(article);
      }
    }, []);
    fs.writeFile(ARTICLES_FILE, JSON.stringify(articles, null, 2), () => {
      res.json({});
    });
  });
});

app.listen(app.get("port"), () => {
  console.log(`Find the server at: http://localhost:${app.get("port")}/`);
});
