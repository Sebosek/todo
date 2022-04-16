export interface Todo {
  id: string;
  text: string;
  completed?: boolean;
  processing?: boolean;
  deleted?: boolean;
}