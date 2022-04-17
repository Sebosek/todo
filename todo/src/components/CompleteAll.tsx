import React, {FunctionComponent} from 'react';
import {useDispatch, useAppState} from "context/TodoContext";
import {active, completed} from "store/selectors";
import {
  createChangeFailed,
  createChanging,
  createToggleCompleted
} from "store/actions";
import Api from "Api";

const CompleteAll: FunctionComponent = () => {
  const dispatch = useDispatch();
  const state = useAppState();
  const todosCount = state.todos.length;
  const completedCount = completed(state).length;
  
  const handleCompleteAllClick = () => {
    const items = active(state);
    items.forEach(({ id }) => dispatch(createChanging(id)));

    Promise
      .allSettled(items.map(({ id, text }) => Api.put(`/todos/${id}`,{text, completed: true})))
      .then(results => results.map((promise, i) => {
        const {id, text} = items[i];
  
        if (promise.status === 'fulfilled') dispatch(createToggleCompleted(id));
        else dispatch(createChangeFailed(id, text, false));
      }));
  };
  
  if (todosCount === 0) return null;
  return (
    <label>
      <input
        className="toggle-all"
        type="checkbox"
        defaultChecked={completedCount === todosCount}
      />
      <label onClick={handleCompleteAllClick} />
    </label>
  );
};

export default CompleteAll;