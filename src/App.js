import React from "react";
import TodoList from "./TodoList";
import { Link } from "react-router-dom";
import "./App.css";

const App = () => (
  <div className="App">
    <div className="App-header">
      <h2>What's going on?</h2>
      <Link to="/todos/new" >Add a Todo</Link>
      <Link to="/todos">Show all Todos</Link>
    </div>
    <TodoList />
  </div>
);

export default App;
