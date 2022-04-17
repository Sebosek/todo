import {Todo} from 'types/Todo';
import {Actions, TodoActions} from 'store/actions';
import {Filter} from "types/Filter";
import {toast} from "react-toastify";

export interface TodoState {
  todos: Array<Todo>;
  filter: Filter;
}

export const reducer = (state: TodoState, action: TodoActions) => {
  switch (action.type) {
    case Actions.TodoLoaded: {
      const { todos } = action;
      return { ...state, todos };
    }
    case Actions.TodoAdding: {
      const { todos } = state;
      const { text, tid } = action;
      const todo: Todo = {
        id: tid,
        text,
        processing: true,
      };
      return {
        ...state,
        todos: [ ...todos, todo ]
      };
    }
    case Actions.TodoAdd: {
      const { tid, id } = action;

      return {
        ...state,
        todos: state.todos.map(i => {
          if (i.id !== tid) return i;

          return {...i, processing: false, id};
        }),
      };
    }
    case Actions.TodoAddFailed: {
      const {tid} = action;
      
      toast.error("Unable to create a todo", {toastId: tid});
      return {
        ...state,
        todos: state.todos.filter(i => i.id !== tid),
      };
    }
    case Actions.TodoChanging: {
      const { id } = action;
      
      return {
        ...state,
        todos: state.todos.map(i => {
          if (i.id !== id) return i;

          return {...i, processing: true};
        }),
      };
    }
    case Actions.TodoChanged: {
      const { id, text } = action;

      return {
        ...state,
        todos: state.todos.map(i => {
          if (i.id !== id) return i;

          return {...i, processing: false, text};
        }),
      };
    }
    case Actions.TodoChangeFailed: {
      const {id, text, completed} = action;

      toast.error("Unable to change todo", {toastId: id});
      return {
        ...state,
        todos: state.todos.filter(i => {
          if (i.id !== id) return i;
          
          return {id, text, completed};
        }),
      };
    }
    case Actions.TodoToggleCompleted: {
      const { id } = action;

      return {
        ...state,
        todos: state.todos.map(i => {
          if (i.id !== id) return i;
          
          const completed = !i.completed;
          return {...i, processing: false, completed };
        }),
      };
    }
    case Actions.TodoDeleting: {
      const { id } = action;

      return {
        ...state,
        todos: state.todos.map(i => {
          if (i.id !== id) return i;

          return {...i, processing: true};
        }),
      };
    }
    case Actions.TodoDeleted: {
      const { id } = action;

      return {
        ...state,
        todos: state.todos.map(i => {
          if (i.id !== id) return i;

          return {...i, deleted: true};
        }),
      };
    }
    case Actions.TodoDeleteFailed: {
      const { id } = action;

      toast.error("Unable to delete todo", {toastId: id});
      return {
        ...state,
        todos: state.todos.map(i => {
          if (i.id !== id) return i;

          return {...i, deleted: false};
        }),
      };
    }
    case Actions.SetFilter: {
      const {filter} = action;
      return {
        ...state,
        filter,
      };
    }
    default:
      throw new Error();
  }
}