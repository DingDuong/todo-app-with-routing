import React, { Component } from "react";
import Todo from "./Todo";
import TodoForm from "./TodoForm";
import { Route, Switch, Redirect } from "react-router-dom";

class TodoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
      latestId: 0
    }
    this.handleAdd = this.handleAdd.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
  }

  componentDidMount() {
    let todos = JSON.parse(localStorage.getItem("todos")) || [];
    let latestId = +JSON.parse(localStorage.getItem("latestId")) || 0;
    this.setState({ todos, latestId });
  }

  handleAdd(newTodo) {
    var newId = this.state.latestId + 1;
    this.setState(
      {
        latestId: newId,
        todos: [
          {
            ...newTodo,
            id: newId
          },
          ...this.state.todos
        ]
      },
      () => {
        localStorage.setItem("todos", JSON.stringify(this.state.todos));
        localStorage.setItem("latestId", this.state.latestId);
      }
    );
  }

  handleEdit(id, updatedTodo) {
    let newTodos = this.state.todos.map(todo => {
      if (id === todo.id) {
        todo = Object.assign({}, todo, updatedTodo, {
          isShowingEditForm: false
        });
      }
      return todo;
    });
    this.setState({ todos: newTodos }, () => {
      localStorage.setItem("todos", JSON.stringify(this.state.todos));
    });
  }

  handleDelete(id) {
    let newTodos = this.state.todos.filter(t => t.id !== id);
    this.setState({ todos: newTodos }, () => {
      localStorage.setItem("todos", JSON.stringify(this.state.todos));
    });
  }

  toggle(id, key) {
    let newTodos = this.state.todos.map(todo => {
      if (id === todo.id) {
        todo = Object.assign({}, todo, { [key]: !todo[key] });
      }
      return todo;
    });
    this.setState({ todos: newTodos }, () => {
      localStorage.setItem("todos", JSON.stringify(this.state.todos));
    });
  }

  render() {
    const todos = this.state.todos.map(todo => (
      <Todo
        key={todo.id}
        title={todo.title}
        description={todo.description}
        handleDelete={this.handleDelete.bind(this, todo.id)}
        handleEdit={this.handleEdit.bind(this, todo.id)}
        toggleComplete={this.toggle.bind(this, todo.id, "isComplete")}
        isComplete={todo.isComplete}
        toggleEditForm={this.toggle.bind(this, todo.id, "isShowingEditForm")}
        isShowingEditForm={todo.isShowingEditForm}
      />
    ));

    return (
      <div>
        
        <Switch>
          <Route
            path="/todos/new"
            render={props => <TodoForm handleSubmit={this.handleAdd} {...props} />}
          />
          <Route
            path="/todos"
            render={props => <div>{todos}</div>}
          />
          <Redirect to="/todos" />
        </Switch>
      </div>
    );
  }
}

export default TodoList;







