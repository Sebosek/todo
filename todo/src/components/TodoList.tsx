import React, {useEffect, useState} from 'react';
import TodoItem from 'components/TodoItem';
import {useDispatch, useAppState} from "context/TodoContext";
import {filtered} from "store/selectors";
import Api from "Api";
import {Todo} from "types/Todo";
import {toast} from "react-toastify";
import {createLoaded} from "store/actions";
import LoadingTodos from "components/LoadingTodos";

const TodoList = () => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const state = useAppState();
  
  useEffect(() => {
    Api
      .get<Array<Todo>>("/todos")
      .then(resp => {
        if (resp.status !== 200) {
          toast.error("Unable to load todos", {toastId: 'loaded-error', autoClose: false});
          return;
        }
        
        const todos = resp.data;
        dispatch(createLoaded(todos));
      })
      .catch(() => {
        toast.error("Unable to load todos", {toastId: 'loaded-error', autoClose: false});
      })
      .finally(() => setLoading(false));
  }, []);
  
  return (
    <ul data-ui-test="todo-list" className="todo-list">
      {loading && (
        <LoadingTodos />
      )}
      {filtered(state).map(todo => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </ul>
  );
};

export default TodoList;