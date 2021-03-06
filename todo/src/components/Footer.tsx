import React, {FunctionComponent} from "react";
import FilterLink from "components/Link";
import {Filter} from "types/Filter";
import {useDispatch, useAppState} from "context/TodoContext";
import {active, completed} from "store/selectors";
import {createDeleted, createDeleteFailed, createDeleting} from "store/actions";
import Api from "Api";

const FILTER_TITLES = [Filter.All, Filter.Active, Filter.Completed];

const Footer: FunctionComponent = () => {
  const dispatch = useDispatch();
  const state = useAppState();
  const activeCount = active(state).length;
  const completedCount = completed(state).length;
  
  const itemWord = activeCount === 1 ? "item" : "items";

  const handleClearClick = () => {
    const items = completed(state);
    items.forEach(({ id }) => dispatch(createDeleting(id)));
    
    Promise
      .allSettled(items.map(({ id }) => Api.delete(`/todos/${id}`)))
      .then(results => results.map((promise, i) => {
        const {id} = items[i];
        
        if (promise.status === 'fulfilled') dispatch(createDeleted(id));
        else dispatch(createDeleteFailed(id));
      }));
  };
  
  return (
    <footer className="footer">
      <span className="todo-count">
        <strong>{activeCount || "No"}</strong> {itemWord} left
      </span>
      <ul className="filters">
        {FILTER_TITLES.map(filter => (
          <li key={filter}>
            <FilterLink filter={filter}>{filter}</FilterLink>
          </li>
        ))}
      </ul>
      {completedCount > 0 && (
        <button className="clear-completed" onClick={handleClearClick}>
          Clear completed
        </button>
      )}
    </footer>
  );
};

export default Footer;