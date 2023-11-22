import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { changeFilter, clearCompleted } from "../redux/todos/todosSlice";
function ButtonGroup() {
  const todos = useSelector((state) => state.todos.items);
  const todosLeft = todos.filter((todo) => !todo.isCompleted).length;
  const activeFilter = useSelector((state) => state.todos.activeFilter);
  const dispatch = useDispatch();
  return (
    <div className="mt-2 row text-center">
      <p className="col-lg-2 text-dark col-12 my-auto">{todosLeft} item left</p>
      <div className="col-lg-6  col-12 mx-auto ">
        <button
          onClick={() => {
            dispatch(changeFilter("all"));
          }}
          id={activeFilter === "all" ? "selected" : ""}
          className="	 btn-outline-dark m-2  btn"
        >
          All
        </button>
        <button
          onClick={() => {
            dispatch(changeFilter("active"));
          }}
          id={activeFilter === "active" ? "selected" : ""}
          className="	 btn-outline-dark m-2  btn"
        >
          Active
        </button>
        <button
          onClick={() => {
            dispatch(changeFilter("completed"));
          }}
          id={activeFilter === "completed" ? "selected" : ""}
          className=" btn-outline-dark m-2 btn"
        >
          Completed
        </button>
      </div>
      <button
        onClick={() => {
          dispatch(clearCompleted());
        }}
        className="col-lg-3 col-12 	    btn-outline-dark me-3 my-auto   ms-auto btn"
      >
        Clear Completed
      </button>
    </div>
  );
}

export default ButtonGroup;
