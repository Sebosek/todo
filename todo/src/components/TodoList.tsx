import React from 'react';
import TodoItem from './TodoItem';
import {useState} from "../context/TodoContext";
import {filtered} from "../context/TodoContext.selectors";

const TodoList = () => {
  const state = useState();
  
  return (
    <ul className="todo-list">
      {filtered(state).map(todo => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </ul>
  );
};

export default TodoList;