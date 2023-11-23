import React, { useEffect } from "react";
import TodoCard from "./TodoCard";
import { useSelector, useDispatch } from "react-redux";
import { selectFiteredTodos, getTodoAsnyc } from "../redux/todos/todosSlice";
import ErrorToast from "./ErrorAlert";

function TodoList() {
  const filteredTodos = useSelector(selectFiteredTodos);
  const isLoading = useSelector((state) => state.todos.isLoading);
  const error = useSelector((state) => state.todos.error);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTodoAsnyc());
  }, [dispatch]);

  return (
    <div className="row mx-0 mt-2 todoList  ">
      {isLoading && (
        <p className="placeholder-wave text-center">
          Loading...
          <span className="placeholder col-12"></span>
        </p>
      )}
      {/* eğer todo,error yoksa ve loading deilse
       */}
      {filteredTodos.length === 0 && !isLoading && !error && (
        <div className="border border-black border-2 my-2  text-center">
          <h3>No todos</h3>
        </div>
      )}
      {error && <ErrorToast error={error}></ErrorToast>}

      {filteredTodos.map((todo) => {
        return <TodoCard key={todo.id} todo={todo}></TodoCard>;
      })}
    </div>
  );
}
export default TodoList;
