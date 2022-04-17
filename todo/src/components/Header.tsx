import React from 'react';
import TodoTextInput from "components/TodoTextInput";
import {useDispatch} from "context/TodoContext";
import {createAdd, createAddFailed, createAdding} from "store/actions";
import {nanoid} from "nanoid";
import Api from "Api";
import {Todo} from "types/Todo";

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
          
          Api.post<Todo>('/todos',{text})
            .then(resp => {
              const {id} = resp.data;
              if (resp.status === 201) dispatch(createAdd(tid, id));
              else throw new Error();
            })
            .catch(() => dispatch(createAddFailed(tid)));
        }}
        placeholder="What needs to be done?"
      />
    </header>
  );
}

export default Header;