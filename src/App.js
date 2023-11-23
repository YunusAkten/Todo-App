import TodoList from "./components/TodoList";
import ButtonGroup from "./components/ButtonGroup";
import TodoForm from "./components/TodoForm";
function App() {
  return (
    <>
      <div className="container  rounded   text-bg-light  p-5  main">
        <h1 className="text-center  mb-3">To Do</h1>

        <TodoForm></TodoForm>
        <TodoList></TodoList>
        <ButtonGroup></ButtonGroup>
      </div>
    </>
  );
}

export default App;
