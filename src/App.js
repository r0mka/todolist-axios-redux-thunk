import React from 'react';
import './App.css';
import TodoList from './components/TodoList';
import Background from './components/Background';

export default function App() {
  return (
    <div className="App">
      <Background />
      <TodoList />
    </div>
  );
}
