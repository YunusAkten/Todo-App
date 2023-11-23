import React from "react";
import { deleteTodoAsync, todoToggleAsync } from "../redux/todos/todosSlice";
import { useDispatch } from "react-redux";
function TodoCard({ todo }) {
  const dispatch = useDispatch();
  const handleclick = async () => {
    await dispatch(todoToggleAsync(todo.id));
  };
  function handleDelete(e) {
    e.stopPropagation();
    if (window.confirm("Are you sure you want to delete this item?")) {
      dispatch(deleteTodoAsync(todo.id));
    }
  }
  return (
    <div
      onClick={handleclick}
      className="row m-0  border border-dark my-2 rounded"
      id={todo.isCompleted ? "completed" : ""}
    >
      <p className="col-6 my-auto   ">{todo.todoText}</p>
      <button
        onClick={handleDelete}
        type="button"
        className="col-1 my-2 rounded btn ms-auto"
      >
        X
      </button>
    </div>
  );
}

export default TodoCard;
