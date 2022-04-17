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
import avoid from "utils/avoid";
import {DELAY} from "const";

interface TodoItemProps {
  todo: Todo;
}

const TodoItem: FunctionComponent<TodoItemProps> = ({ todo }) => {
  const [editing, setEditing] = useState(false);
  const dispatch = useDispatch();
  
  const deleteTodo = (id: string) => {
    dispatch(createDeleting(id));
    
    avoid(DELAY)
      .then(() => dispatch(createDeleted(id)))
      .catch(() => dispatch(createDeleteFailed(id)));
  };
  const editTodo = (id: string, text: string) => {
    const backup = {...todo};
    dispatch(createChanging(id));

    avoid(DELAY)
      .then(() => dispatch(createChanged(id, text)))
      .catch(() => dispatch(createChangeFailed(id, backup.text, !!backup.completed)));
  };
  const toggleCompleteTodo = (id: string) => {
    const backup = {...todo};
    dispatch(createChanging(id));

    avoid(DELAY)
      .then(() => dispatch(createToggleCompleted(id)))
      .catch(() => dispatch(createChangeFailed(id, backup.text, !!backup.completed)));
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
            className="toggle"
            type="checkbox"
            checked={todo.completed}
            onChange={() => toggleCompleteTodo(todo.id)}
          />
          <label onDoubleClick={handleDoubleClick}>{todo.text}</label>
          <button className="destroy" onClick={() => deleteTodo(todo.id)} />
        </div>
      )}
      {todo.processing && (
        <div className="loading">Loading&hellip;</div>
      )}
    </li>
  );
};

export default TodoItem;