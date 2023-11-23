import React from "react";
import { useDispatch } from "react-redux";
import { addTodoAsync } from "../redux/todos/todosSlice";

function TodoForm() {
  const dispatch = useDispatch();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const todoText = e.target[0].value;
    await dispatch(addTodoAsync({ todoText }));
    e.target[0].value = "";
  };
  return (
    <div>
      {" "}
      <form onSubmit={handleSubmit}>
        <input
          required
          type="text"
          className="w-100 p-2 form-control"
          placeholder="What needs to be done?"
        ></input>
      </form>
    </div>
  );
}

export default TodoForm;
