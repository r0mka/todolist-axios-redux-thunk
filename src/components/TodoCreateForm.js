import React, { useState } from 'react';
import './TodoCreateForm.css';

export default function TodoCreateForm(props) {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    props.create(inputValue);
    setInputValue('');
  };
  return (
    <form onSubmit={handleSubmit} className="TodoCreateForm">
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button disabled={inputValue === ''} type="submit">
        Create New Todo
      </button>
    </form>
  );
}
