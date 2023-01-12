import React, { useState } from "react";
import {
  useGetTodosQuery,
  useAddTodoMutation,
  useUpdateTodoMutation,
  useDeleteTodoMutation,
} from "./api/apiSlice";

const TodoList = () => {
  const [newTodo, setNewTodo] = useState([]);

  const {
    data: todos,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetTodosQuery();
  const [addTodo] = useAddTodoMutation();
  const [updateTodo] = useUpdateTodoMutation();
  const [deleteTodo] = useDeleteTodoMutation();

  const handleSubmit = (e) => {
    e.preventDefault();
    addTodo({ userId: 1, title: newTodo, completed: false });
    setNewTodo("");
  };

  let content;

  if (isLoading) {
    content = <p>loading ...</p>;
  }  else if (isError) {
    console.log(error);
  } else if (isSuccess) {
    content = todos.map((todo) => {
     console.log(todo)
      return (
        <article key={todo.io}>
          <div className="todo">
            <input
              type={"checkbox"}
              checked={todo.completed}
              id={todo.id}
              onChange={() =>
                updateTodo({ ...todo, completed: !todo.completed })
              }
            />
            <label htmlFor={todo.id}>{todo.title}</label>
            <button onClick={() => deleteTodo({ id: todo.id })}>Delete</button>
          </div>
        </article>
      );
    });
  }

  const newItemList = (
    <form onSubmit={handleSubmit}>
      <label htmlFor="new-todo">
        <label htmlFor="new-todo">Enter a New Todo</label>
        <div className="new-todo">
          <input
            type="text"
            placeholder="Write"
            id="new-todo"
            onChange={(e) => setNewTodo(e.target.value)}
          />
        </div>
        <button>add</button>
      </label>
    </form>
  );

  return (
    <div>
      {newItemList}
      {content}
    </div>
  );
};

export default TodoList;
