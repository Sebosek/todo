import React, {FunctionComponent} from 'react';
import {useDispatch, useAppState} from "context/TodoContext";
import {active, completed} from "store/selectors";
import {createChanging, createToggleCompleted} from "store/actions";
import avoid from "utils/avoid";
import {DELAY} from "const";

const CompleteAll: FunctionComponent = () => {
  const dispatch = useDispatch();
  const state = useAppState();
  const todosCount = state.todos.length;
  const completedCount = completed(state).length;
  
  const handleCompleteAllClick = () => {
    const items = active(state);

    items.forEach(({ id }) => dispatch(createChanging(id)));

    const time = DELAY * items.length;
    avoid(time).then(() => items.forEach(({ id }) => dispatch(createToggleCompleted(id))));
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