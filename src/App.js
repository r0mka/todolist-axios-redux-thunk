import React from 'react';
import './App.css';
import TodoList from './components/TodoList';
import Background from './components/Background';

function App() {
  return (
    <div className="App">
      <Background />
      <TodoList />
    </div>
  );
}

export default App;
