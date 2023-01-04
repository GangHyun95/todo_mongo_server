// Todo 를 위한 라우터
let express = require("express");
let router = express.Router();

// Todo 모델을 가지고 온다.
const { Todo } = require("../model/TodoModel.js");

// 할 일 등록
router.post("/submit", (req, res) => {
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
router.post("/list", (req, res) => {
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
router.post("/updatetoggle", (req, res) => {
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
router.post("/updatetitle", (req, res) => {
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
router.post("/delete", (req, res) => {
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
router.post("/deleteall", (req, res) => {
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

module.exports = router;
