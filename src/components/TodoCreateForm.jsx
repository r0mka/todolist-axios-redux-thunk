import React from 'react';
import './styles/TodoCreateForm.css';

export default function TodoCreateForm({ create }) {
  const [inputValue, setInputValue] = React.useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    create(inputValue);
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
