const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
// const { Todo } = require("./model/TodoModel.js");
var cors = require("cors");
const config = require("./config/key.js");
const app = express();
const port = 5000;

let corsOptions = {
  origin: "*", // 출처 허용 옵션
  credential: true, // 사용자 인증이 필요한 리소스(쿠키 등) 접근
};
app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Post 관련 Router 연결
app.use("/api/post", require("./router/Post.js"));
// User 관련 Router 연결
app.use("/api/user", require("./router/User.js"));

app.use(express.static(path.join(__dirname, "./build")));

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

// 요청 : Request
// 응답 : Response
app.get("/", (req, res) => {
  // 파일을 보여줌
  res.sendFile(path.join(__dirname, "./build/index.html"));
});
//  주소가 없는 경우에 강제 URL 이동
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./build/index.html"));
});
