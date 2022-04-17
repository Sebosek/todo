import {TodoState} from "store/reducer";
import {Filter} from "types/Filter";
import {Todo} from "types/Todo";

export const all = ({ todos }: TodoState) => todos.filter(todo => !todo.deleted);
export const active = ({ todos }: TodoState) => todos.filter(todo => !todo.deleted && !todo.completed);
export const completed = ({ todos }: TodoState) => todos.filter(todo => !todo.deleted && todo.completed);
export const filtered = (state: TodoState) => {
  const { filter } = state;
  const map: Record<Filter, () => Array<Todo>> = {
    [Filter.All]: () => all(state),
    [Filter.Active]: () => active(state),
    [Filter.Completed]: () => completed(state),
  };
  
  return map[filter]();
};
