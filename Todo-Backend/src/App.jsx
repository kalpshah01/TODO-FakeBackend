import { useEffect, useReducer } from "react";
import "./App.css";
import Swal from "sweetalert2";
import { FaEdit, FaTrash, FaPlus, FaCheck } from "react-icons/fa";
import { getTodos, addTodo, updateTodo, deleteTodo } from "./helper";
import { todoReducer, initialState } from "./utils/todoReducer";

function App() {
  const [state, dispatch] = useReducer(todoReducer, initialState);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    const res = await getTodos();
    dispatch({ type: "SET_TODOS", payload: res });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!state.title.trim()) {
      Swal.fire({
        icon: "warning",
        title: "Enter a todo first",
      });
      return;
    }

    if (state.editId) {
      await updateTodo(state.editId, state.title);
      Swal.fire({
        icon: "success",
        title: "Todo Updated",
        timer: 1500,
        showConfirmButton: false,
      });
      dispatch({ type: "UPDATE_TODO" });
    } else {
      await addTodo(state.title);
      Swal.fire({
        icon: "success",
        title: "Todo Added",
        timer: 1500,
        showConfirmButton: false,
      });
      dispatch({ type: "SET_TITLE", payload: "" });
    }

    fetchTodos();
  };

  const handleEdit = (todo) => {
    dispatch({ type: "SET_EDIT_MODE", payload: { id: todo.id, title: todo.title } });
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Delete Todo?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "red",
      cancelButtonColor: "gray",
      confirmButtonText: "Yes, Delete",
    });

    if (result.isConfirmed) {
      await deleteTodo(id);
      Swal.fire({
        title: "Deleted!",
        text: "Todo deleted successfully.",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });
      fetchTodos();
    }
  };

  return (
  <div id="app-container">
    <h2 id="app-title">Todo App</h2>

    <form className="todo-form" onSubmit={handleSubmit}>
      <input
        id="todo-input"
        value={state.title}
        onChange={(e) => dispatch({ type: "SET_TITLE", payload: e.target.value })}
        placeholder="Enter task"
      />

   <button className="submit-btn" type="submit">
  {state.editId ? (
    <>
      <FaCheck /> Update
    </>
  ) : (
    <>
      <FaPlus /> Add
    </>
  )}
</button>
    </form>

    <ul className="todo-list">
      {state.todos.map((todo) => (
        <li className="todo-item" key={todo.id}>
          <span className="todo-title">{todo.title}</span>

          <div className="action-buttons">
  <button
    className="edit-btn"
    onClick={() => handleEdit(todo)}
  >
    <FaEdit />
  </button>

  <button
    className="delete-btn"
    onClick={() => handleDelete(todo.id)}
  >
    <FaTrash />
  </button>
</div>
        </li>
      ))}
    </ul>
  </div>
);
}

export default App;