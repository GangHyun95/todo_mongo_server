// mongoose 모듈
const mongoose = require("mongoose");

// 데이터 타입을 정의
const todoSchema = new mongoose.Schema(
  {
    id: Number,
    title: String,
    completed: Boolean,
  },
  // 위 Schema 들을 todos라는 collection에 모으겠다.
  { collection: "todos" }
);

const Todo = mongoose.model("Todo", todoSchema);
module.exports = { Todo };
