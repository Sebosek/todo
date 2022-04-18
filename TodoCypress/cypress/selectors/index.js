const selectors = {
  TODO_INPUT: '[data-ui-test=todo-input]',
  TODO_LIST: '[data-ui-test=todo-list]',
  TODO_ITEM: '[data-ui-test=todo-item]',
  TODO_ITEM_LOADING: '[data-ui-test=todo-item] [data-ui-test=todo-loading]',
  TODO_NOT_COMPLETED_ITEM: '[data-ui-test=todo-item]:not(.completed)',
  TODO_TOGGLE: '[data-ui-test=todo-toggle]',
  TODO_DESTROY: '[data-ui-test=todo-destroy]',
  TODO_LOADING: '[data-ui-test=todo-loading]',
  TODO_LOADING_ERROR: '.Toastify #loaded-error',
  TODO_ERROR: '.Toastify [id^=todo-error__]',
  by: {
    id: (id) => `[data-ui-test=todo-item][data-ui-test-todo-id=${id}]`,
    filter: (filter) => `[data-ui-test=todo-filter][data-ui-test-filter=${filter}]`,
  },
};

export default selectors;
