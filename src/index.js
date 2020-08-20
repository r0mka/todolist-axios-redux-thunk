import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import './App.css';

import store from './redux/store';
import { Provider } from 'react-redux';

import TodoList from './components/TodoList.jsx';
import Background from './components/Background.jsx';

function App() {
  return (
    <div className="App">
      <Background />
      <TodoList />
    </div>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
