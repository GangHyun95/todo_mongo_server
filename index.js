const express = require("express");

const path = require("path");
const mongoose = require("mongoose");
const { Todo } = require("./model/TodoModel.js");

const config = require("./config/key.js");
const app = express();
const port = 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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

// 할 일 등록
app.post("/api/post/submit", (req, res) => {
  // console.log(req.body);
  let temp = req.body;
  const todoPost = new Todo(temp);
  todoPost
    .save()
    // data 저장이 성공한 경우
    .then(() => {
      0;
      res.status(200).json({ success: true });
    })
    // data 저장이 실패한 경우
    .catch((err) => {
      console.log(err);
      res.status(400).json({ success: false });
    });
});

// 목록 읽어오기
app.post("/api/post/list", (req, res) => {
  console.log("전체목록 호출");
  Todo.find({})
    .exec()
    .then((doc) => {
      res.status(200).json({ success: true, initTodo: doc });
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json({ success: false });
    });
});

// 할일을 completed를 업데이트
app.post("/api/post/updatetoggle", (req, res) => {
  let temp = {
    completed: req.body.completed,
  };
  // console.log(req.body);
  // mongoose 문서 참조
  Todo.updateOne({ id: req.body.id }, { $set: temp })
    .exec()
    .then(() => {
      // console.log("completed 업데이트 완료");
      res.status(200).json({ success: true });
    })
    .catch((err) => console.log(err));
});

// 타이틀 업데이트
app.post("/api/post/updatetitle", (req, res) => {
  console.log(req.body);
  let temp = {
    title: req.body.title,
  };
  Todo.updateOne({ id: req.body.id }, { $set: temp })
    .exec()
    .then(() => {
      res.status(200).json({ success: true });
    })
    .catch((err) => console.log(err));
});

// 할일 삭제
app.post("/api/post/delete", (req, res) => {
  console.log(req.body);
  Todo.deleteOne({ id: req.body.id })
    .exec()
    .then(() => {
      res.status(200).json({ success: true });
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json({ success: false });
    });
});

// 전체 할일 삭제
app.post("/api/post/deleteall", (req, res) => {
  Todo.deleteMany({})
    .exec()
    .then(() => {
      res.status(200).json({ success: true });
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json({ success: false });
    });
});
