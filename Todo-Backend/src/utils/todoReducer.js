export const initialState = {
  todos: [],
  title: "",
  editId: null,
};

export const todoReducer = (state, action) => {
  switch (action.type) {
    case "SET_TODOS":
      return { ...state, todos: action.payload };

    case "SET_TITLE":
      return { ...state, title: action.payload };

    case "SET_EDIT_ID":
      return { ...state, editId: action.payload };

    case "ADD_TODO":
      return { ...state, todos: [...state.todos, action.payload], title: "" };

    case "UPDATE_TODO":
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === state.editId
            ? { ...todo, title: state.title }
            : todo
        ),
        title: "",
        editId: null,
      };

    case "DELETE_TODO":
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload),
      };

    case "SET_EDIT_MODE":
      return {
        ...state,
        editId: action.payload.id,
        title: action.payload.title,
      };

    default:
      return state;
  }
};
