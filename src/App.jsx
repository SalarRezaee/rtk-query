import React from "react";
import TodoList from "./features/TodoList";
import { ApiProvider } from "@reduxjs/toolkit/query/react";
import { apiSlice } from "./features/api/apiSlice";

const App = () => {
  return (
    <ApiProvider api={apiSlice}>
      <TodoList />
    </ApiProvider>
  );
};

export default App;
