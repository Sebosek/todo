import {Filter} from "../types/Filter";

export enum Actions {
  TodoAdding = 'Todo item is being add',
  TodoAdd = 'Todo item has been add',
  TodoAddFailed = 'Unable to add todo',
  TodoChanging = 'Todo item is being change',
  TodoChanged = 'Todo item has been changed',
  TodoChangeFailed = 'Unable to change todo',
  TodoToggleCompleted = 'Todo item has toggled completed',
  TodoDeleting = 'Todo item is being delete',
  TodoDeleted = 'Todo item has been deleted',
  TodoDeleteFailed = 'Unable to delete todo',
  SetFilter = 'Set current filter',
}

export type TodoAdding = { type: Actions.TodoAdding, tid: string, text: string };
export type TodoAdd = { type: Actions.TodoAdd, tid: string, id: string };
export type TodoAddFailed = { type: Actions.TodoAddFailed, tid: string };
export type TodoChanging = { type: Actions.TodoChanging, id: string };
export type TodoChanged = { type: Actions.TodoChanged, id: string, text: string };
export type TodoChangeFailed = { type: Actions.TodoChangeFailed, id: string, text: string, completed: boolean };
export type TodoToggleCompleted = { type: Actions.TodoToggleCompleted, id: string };
export type TodoDeleting = { type: Actions.TodoDeleting, id: string };
export type TodoDeleted = { type: Actions.TodoDeleted, id: string };
export type TodoDeleteFailed = { type: Actions.TodoDeleteFailed, id: string };
export type SetFilter = { type: Actions.SetFilter, filter: Filter };

export const createAdding = (tid: string, text: string):TodoAdding => ({ type: Actions.TodoAdding, tid, text });
export const createAdd = (tid: string, id: string):TodoAdd => ({ type: Actions.TodoAdd, tid, id });
export const createAddFailed = (tid: string):TodoAddFailed => ({ type: Actions.TodoAddFailed, tid });
export const createChanging = (id: string):TodoChanging => ({ type: Actions.TodoChanging, id });
export const createChanged = (id: string, text: string):TodoChanged => ({ type: Actions.TodoChanged, id, text });
export const createChangeFailed = (id: string, text: string, completed: boolean):TodoChangeFailed => ({ type: Actions.TodoChangeFailed, id, text, completed });
export const createToggleCompleted = (id: string):TodoToggleCompleted => ({ type: Actions.TodoToggleCompleted, id });
export const createDeleting = (id: string):TodoDeleting => ({ type: Actions.TodoDeleting, id });
export const createDeleted = (id: string):TodoDeleted => ({ type: Actions.TodoDeleted, id });
export const createDeleteFailed = (id: string):TodoDeleteFailed => ({ type: Actions.TodoDeleteFailed, id });
export const createSetFilter = (filter: Filter):SetFilter => ({ type: Actions.SetFilter, filter });

export type TodoActions
  = TodoAdding
  | TodoAdd
  | TodoAddFailed
  | TodoChanging
  | TodoChanged
  | TodoChangeFailed
  | TodoToggleCompleted
  | TodoDeleting
  | TodoDeleted
  | TodoDeleteFailed
  | SetFilter;
