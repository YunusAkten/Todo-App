import TodoList from "./components/todoList";
import ButtonGroup from "./components/buttonGroup";
import { useSelector, useDispatch } from "react-redux";
import { addTodo, selectFiteredTodos } from "./redux/todos/todosSlice";
function App() {
  const todos = useSelector(selectFiteredTodos);
  const dispatch = useDispatch();
  function handleSubmit(e) {
    e.preventDefault();
    const todoText = e.target[0].value;
    dispatch(addTodo({ todoText }));
  }

  return (
    <>
      <div className="container  rounded   text-bg-light  p-5  main">
        <h1 className="text-center  mb-3">To Do</h1>

        <form onSubmit={handleSubmit}>
          <input
            required
            type="text"
            className="w-100 p-2 form-control"
            placeholder="What needs to be done?"
          ></input>
        </form>
        <TodoList todos={todos}></TodoList>
        <ButtonGroup></ButtonGroup>
      </div>
    </>
  );
}

export default App;
