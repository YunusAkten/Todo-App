import React from "react";
import TodoCard from "./TodoCard";
import { useSelector } from "react-redux";
import { selectFiteredTodos } from "../redux/todos/todosSlice";
function TodoList({ todos }) {
  const filteredTodos = useSelector(selectFiteredTodos);
  return (
    <div className="row mx-0 mt-2 todoList  ">
      {filteredTodos.map((todo) => {
        return <TodoCard key={todo.id} todo={todo}></TodoCard>;
      })}
    </div>
  );
}
export default TodoList;
