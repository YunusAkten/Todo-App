import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
const endPoint = process.env.REACT_APP_API_BASE_ENDPOINT;
// getTodoAsnyc
export const getTodoAsnyc = createAsyncThunk("todos/getTodos", async () => {
  const response = await fetch(`${endPoint}/todos`);

  const data = await response.json();
  return data;
});
// addTodoAsync
export const addTodoAsync = createAsyncThunk("todos/addTodo", async (todo) => {
  const response = await fetch(`${endPoint}/todos`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(todo),
  });
  return await response.json();
});
// todoToggleAsync
export const todoToggleAsync = createAsyncThunk(
  "todos/todoToggle",
  async (id) => {
    const response = await fetch(`${endPoint}/todos/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return await response.json();
  }
);
//deleteTodoAsync
export const deleteTodoAsync = createAsyncThunk(
  "todos/deleteTodo",
  async (id) => {
    const response = await fetch(`${endPoint}/todos/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return await response.json();
  }
);
//clearCompletedAsync
export const clearCompletedAsync = createAsyncThunk(
  "todos/clearCompleted",
  async () => {
    const response = await fetch(`${endPoint}/todos`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return await response.json();
  }
);
export const todosSlice = createSlice({
  name: "todos",
  initialState: {
    items: [],
    activeFilter: "all",
    isLoading: true,
    error: null,
  },
  reducers: {
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
  extraReducers: {
    //getTodoAsnyc
    [getTodoAsnyc.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.items = action.payload;
    },
    [getTodoAsnyc.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    },
    //addTodoAsync
    [addTodoAsync.fulfilled]: (state, action) => {
      state.items.push(action.payload);
    },
    [addTodoAsync.rejected]: (state, action) => {
      state.error = action.error.message;
    },
    //todoToggleAsync
    [todoToggleAsync.fulfilled]: (state, action) => {
      const index = state.items.findIndex(
        (item) => item.id === action.payload.id
      );
      state.items[index] = action.payload;
    },
    [todoToggleAsync.rejected]: (state, action) => {
      state.error = action.error.message;
    },
    //deleteTodoAsync
    [deleteTodoAsync.fulfilled]: (state, action) => {
      state.items = action.payload;
    },
    [deleteTodoAsync.rejected]: (state, action) => {
      state.error = action.error.message;
    },
    //clearCompletedAsync
    [clearCompletedAsync.fulfilled]: (state, action) => {
      state.items = action.payload;
    },
    [clearCompletedAsync.rejected]: (state, action) => {
      state.error = action.error.message;
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
export const { changeFilter } = todosSlice.actions;
export const todoReducer = todosSlice.reducer;
