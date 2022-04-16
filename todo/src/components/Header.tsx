import React from 'react';
import TodoTextInput from "./TodoTextInput";
import {useDispatch} from "../context/TodoContext";
import {createAdd, createAddFailed, createAdding} from "../context/TodoContext.actions";
import {nanoid} from "nanoid";
import avoid from "../utils/avoid";
import {DELAY} from "../const";

const Header = () => {
  const dispatch = useDispatch();
  
  return (
    <header className="header">
      <h1>todos</h1>
      <TodoTextInput
        newTodo={true}
        onSave={text => {
          if (text.length === 0) return;
          
          const tid = nanoid();
          dispatch(createAdding(tid, text));
          avoid(DELAY)
            .then(() => dispatch(createAdd(tid, nanoid())))
            .catch(() => dispatch(createAddFailed(tid)));
        }}
        placeholder="What needs to be done?"
      />
    </header>
  );
}

export default Header;