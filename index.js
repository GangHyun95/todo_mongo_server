const express = require("express");
// path 모듈 사용
const path = require("path");
const mongoose = require("mongoose");
const { Todo } = require("./model/TodoModel");
// 개발 인증 관련
const config = require("./config/key.js");
const app = express();
const port = 5000;

// 요청이 들어오면 JSON 사용
app.use(express.json());
// url을 인코딩 진행해줌
app.use(express.urlencoded({ extended: true }));

// 고정된(static) Path 경로를 설정한다.
// 폴더경로를 적어준다.
app.use(express.static(path.join(__dirname, "../client/build/")));

// 서버가 요청을 받아들이기 위해서 대기 중.
// listen(서버를 오픈할 포트번호, function(){서버 오픈시 실행할 코드})
app.listen(port, () => {
  // mongoose 모듈
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

// 요청:Request
// 응답:Response
app.get("/", (req, res) => {
  // 파일을 보여줌
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

// 테스트 요청이 들어왔다.
// 요청 : request , 응답:response

// app.post("/api/test", (req, res) => {
//   console.log(req.body);
//   // 200?? 서버가 살아있다.
//   // 약속된 숫자 (400-> 우리 잘못) (500 -> 서버잘못)
//   res.status(200).json({
//     success: true,
//     text: req.body.text,
//     name: req.body.name,
//     age: req.body.age,
//     wedding: req.body.wedding,
//   });
// });

// 할일 등록
app.post("/api/post/submit", (req, res) => {
  // console.log(req.body);
  let temp = req.body;
  const todoPost = new Todo(temp);
  todoPost
    .save()
    // data 저장이 성공한 경우
    .then(() => {
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
      // console.log(doc);
      res.status(200).json({ success: true, initTodo: doc });
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json({ success: false });
    });
});
