import React, {createContext, Dispatch, FunctionComponent, useContext, useReducer} from "react";
import {reducer, TodoState} from "./TodoContext.reducer";
import {TodoActions} from "./TodoContext.actions";
import {Filter} from "../types/Filter";

const TodoContext = createContext<{ state: TodoState, dispatch: Dispatch<TodoActions> } | undefined>(undefined);

export const TodoProvider: FunctionComponent = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, {todos: [], filter: Filter.All});

  const value = {
    state,
    dispatch,
  };

  return (
    <TodoContext.Provider value={value}>
      <div className="todoapp">
        {children}
      </div>
    </TodoContext.Provider>
  );
};

export const useState = (): TodoState => {
  const ctx = useContext(TodoContext);
  if (ctx === undefined) {
    throw new Error("useState must be called inside the 'TodoProvider'");
  }

  return ctx.state;
};

export const useDispatch = (): Dispatch<TodoActions> => {
  const ctx = useContext(TodoContext);
  if (ctx === undefined) {
    throw new Error("useDispatch must be called inside the 'TodoProvider'");
  }
  
  return ctx.dispatch;
};