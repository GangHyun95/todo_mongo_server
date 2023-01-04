const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
// const { Todo } = require("./model/TodoModel.js");

const config = require("./config/key.js");
const app = express();
const port = 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Post 관련 Router 연결
app.use("/api/post", require("./router/Post.js"));

app.use(express.static(path.join(__dirname, "../client/build")));

app.listen(port, () => {
  mongoose
    .connect(config.mongoURI)
    .then(() => {
      console.log("DB 연결 성공");
      console.log(`Example app listening on port ${port}`);
    })
    .catch((err) => {
      console.log(`DB 연결 실패 ${err}`);
    });
});

app.post("/api/user/register", (req, res) => {});
