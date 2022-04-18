import React, {FunctionComponent, useState} from 'react';
import cx from 'classnames';
import TodoTextInput from 'components/TodoTextInput';
import {Todo} from 'types/Todo';
import {useDispatch} from "context/TodoContext";
import {
  createChanged,
  createChangeFailed,
  createChanging,
  createDeleted,
  createDeleteFailed,
  createDeleting,
  createToggleCompleted
} from "store/actions";
import Api from "Api";

interface TodoItemProps {
  todo: Todo;
}

const TodoItem: FunctionComponent<TodoItemProps> = ({ todo }) => {
  const [editing, setEditing] = useState(false);
  const dispatch = useDispatch();
  
  const deleteTodo = (id: string) => {
    dispatch(createDeleting(id));

    Api.delete(`/todos/${id}`)
      .then(resp => {
        if (resp.status === 204) dispatch(createDeleted(id));
        else throw new Error();
      })
      .catch(() => dispatch(createDeleteFailed(id)));
  };
  const editTodo = (id: string, text: string) => {
    const backup = {...todo};
    dispatch(createChanging(id));

    Api.put(`/todos/${id}`, {text})
      .then(resp => {
        if (resp.status === 204) dispatch(createChanged(id, text)); 
        else throw new Error();
      })
      .catch(() => dispatch(createChangeFailed(id, backup.text, !!backup.completed)));
  };
  const toggleCompleteTodo = (id: string) => {
    const {text, completed} = {...todo};
    dispatch(createChanging(id));

    Api.put(`/todos/${id}`, {text, completed: !completed})
      .then(() => dispatch(createToggleCompleted(id)))
      .catch(() => dispatch(createChangeFailed(id, text, !!completed)));
  };
  
  const handleDoubleClick = () => {
    setEditing(true);
  };

  const handleSave = (id: string, text: string) => {
    if (text.length === 0) {
      deleteTodo(id);
    } else {
      editTodo(id, text);
    }
    
    setEditing(false);
  };
  
  return (
    <li
      data-ui-test="todo-item"
      data-ui-test-todo-id={todo.id}
      className={cx({
        completed: todo.completed,
        editing: editing,
      })}
    >
      {editing && (
        <TodoTextInput
          text={todo.text}
          editing={editing}
          onSave={text => handleSave(todo.id, text)}
        />
      )}
      {!editing && (
        <div className="view">
          <input
            data-ui-test="todo-toggle"
            className="toggle"
            type="checkbox"
            checked={todo.completed}
            onChange={() => toggleCompleteTodo(todo.id)}
          />
          <label
            data-ui-test="todo-label"
            onDoubleClick={handleDoubleClick}
          >
            {todo.text}
          </label>
          <button
            data-ui-test="todo-destroy"
            className="destroy" 
            onClick={() => deleteTodo(todo.id)}
          />
        </div>
      )}
      {todo.processing && (
        <div data-ui-test="todo-loading" className="loading">Loading&hellip;</div>
      )}
    </li>
  );
};

export default TodoItem;