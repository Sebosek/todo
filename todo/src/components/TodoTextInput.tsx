import React, {ChangeEvent, FunctionComponent, KeyboardEvent, useState} from 'react';
import cx from 'classnames';

interface TodoTextInputProps {
  onSave: (text: string) => void;
  text?: string;
  placeholder?: string;
  newTodo?: boolean;
  editing?: boolean;
}

const TodoTextInput: FunctionComponent<TodoTextInputProps> = ({onSave, text, placeholder, editing, newTodo}) => {
  const [value, setValue] = useState<string>(text ?? '');
  
  const callOnSave = (value: string) => {
    if (typeof onSave !== 'function') return;

    onSave(value);
  };
  
  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (newTodo) return;
    
    callOnSave(value);
  };
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;
    
    setValue(text);
  };
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement> & { target: HTMLInputElement }) => {
    if (e.code.toLowerCase() === 'enter') {
      const text = e.target.value.trim();
      
      callOnSave(text);
      
      if (!newTodo) return;
      setValue('');
    }
  };
  
  return (
    <input
      data-ui-test="todo-input"  
      className={
        cx({
          'edit': editing,
          'new-todo': newTodo
        })}
      type="text"
      placeholder={placeholder}
      autoFocus={true}
      value={value}
      onBlur={handleBlur}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
    />
  )
};

export default TodoTextInput;