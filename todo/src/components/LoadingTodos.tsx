import React from 'react';

const LoadingTodos = () => (
  <li data-ui-test="todo-loading">
    <div className="view">
      <label>&nbsp;</label>
    </div>
    <div className="loading">Loading todos&hellip;</div>
  </li>
);

export default LoadingTodos;