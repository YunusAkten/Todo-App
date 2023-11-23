const express = require("express");
const dotenv = require("dotenv");
const colors = require("colors");
const cors = require("cors");
const { json } = require("body-parser");
const { nanoid } = require("nanoid");

dotenv.config({ path: "./config.env" });

const app = express();

app.use(cors());
app.use(json());

let todos = [
  { id: nanoid(), todoText: "Learn React", isCompleted: false },
  { id: nanoid(), todoText: "Meet friend for lunch", isCompleted: false },
  { id: nanoid(), todoText: "Build really cool todo app", isCompleted: false },
];

app.get("/todos", (req, res) => res.send(todos));

app.post("/todos", (req, res) => {
  const todo = { todoText: req.body.todoText, id: nanoid(), completed: false };
  todos.push(todo);
  return res.send(todo);
});
app.delete("/todos", (req, res) => {
  todos = todos.filter((todo) => !todo.isCompleted);
  return res.send(todos);
});
app.patch("/todos/:id", (req, res) => {
  const id = req.params.id;
  const index = todos.findIndex((todo) => todo.id === id);
  if (index > -1) {
    todos[index].isCompleted = !todos[index].isCompleted;
  }
  return res.send(todos[index]);
});

app.delete("/todos/:id", (req, res) => {
  const id = req.params.id;
  const index = todos.findIndex((todo) => todo.id === id);
  if (index > -1) {
    todos.splice(index, 1);
  }

  res.send(todos);
});

const PORT = 7000;

app.listen(PORT, console.log(`Server running on port ${PORT}`.green.bold));
