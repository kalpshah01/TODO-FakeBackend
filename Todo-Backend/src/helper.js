const API_URL = "http://localhost:3000/todos";

export const getTodos = async () => {
  let res = await fetch(API_URL, {
    method: "GET",
  });
  let todos = await res.json();
  return todos;
};

export const addTodo = async (input) => {
  let todo = await fetch(API_URL, {
    method: "POST",
    body: JSON.stringify({ title: input, done: false }),
  });
  let data = await todo.json();
  console.log("Data .........", data);
  return data;
};

export const updateTodo = async (id, input) => {
  let todo = await fetch(`${API_URL}/${id}`, {
    method: "PATCH",
    body: JSON.stringify({ title: input }),
  });
  let data = await todo.json();
  console.log("Updated .........", data);
  return data;
};

export const deleteTodo = async (id) => {
  let todo = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
  let data = await todo.json();
  console.log("Deleted .........", data);
  return data;
};
