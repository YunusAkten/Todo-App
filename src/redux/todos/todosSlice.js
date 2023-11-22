import { createSlice, nanoid } from "@reduxjs/toolkit";
export const todosSlice = createSlice({
  name: "todos",
  initialState: {
    items: [
      { id: 1, todoText: "Learn React", isCompleted: false },
      { id: 2, todoText: "Meet friend for lunch", isCompleted: false },
      { id: 3, todoText: "Build really cool todo app", isCompleted: false },
    ],
    activeFilter: "all",
  },
  reducers: {
    addTodo: {
      reducer: (state, action) => {
        state.items.push(action.payload);
      },
      prepare: ({ todoText }) => {
        return {
          payload: {
            id: nanoid(),
            todoText,
            isCompleted: false,
          },
        };
      },
    },
    toggle: (state, action) => {
      const id = action.payload;
      const todo = state.items.find((item) => item.id === id);
      todo.isCompleted = !todo.isCompleted;
    },
    del: (state, action) => {
      const id = action.payload;
      const newItems = state.items.filter((item) => item.id !== id);
      state.items = newItems;
    },
    changeFilter: (state, action) => {
      state.activeFilter = action.payload;
    },
    clearCompleted: (state) => {
      if (
        window.confirm("Are you sure you want to delete all completed items?")
      ) {
        const newItems = state.items.filter((item) => !item.isCompleted);
        state.items = newItems;
      }
    },
  },
});
export const selectTodos = (state) => state.todos.items;
export const selectFiteredTodos = (state) => {
  if (state.todos.activeFilter === "all") return state.todos.items;
  return state.todos.items.filter((todo) =>
    state.todos.activeFilter === "active"
      ? todo.isCompleted === false
      : todo.isCompleted === true
  );
};
export const { addTodo, toggle, del, changeFilter, clearCompleted } =
  todosSlice.actions;
export const todoReducer = todosSlice.reducer;
