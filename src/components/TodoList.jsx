import React from 'react';
import './styles/TodoList.css';

import { connect } from 'react-redux';

import TodoCreateForm from './TodoCreateForm';
import Todo from './Todo';
import Spinner from './Spinner';
import {
  getList,
  addTodo,
  deleteTodo,
  updateTodo,
  toggleDone,
} from '../redux/actions';

function TodoList(props) {
  const {
    loading,
    todos,
    getList,
    addTodo,
    deleteTodo,
    updateTodo,
    toggleDone,
  } = props;

  const update = (id, newTitle) => updateTodo(id, newTitle);

  const destroy = (id) => deleteTodo(id);

  const toggle = (id) => {
    const currentDoneStatus = todos.find((todo) => todo.id === id).done;
    toggleDone(id, currentDoneStatus);
  };

  React.useEffect(() => {
    getList();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="TodoList">
      <h1>TodoList</h1>
      <TodoCreateForm create={addTodo} />
      {loading && <Spinner />}
      {!loading && (
        <ul>
          {todos.map((todo, index) => (
            <Todo
              key={todo.id}
              id={todo.id}
              title={todo.title}
              done={todo.done}
              update={update}
              destroy={destroy}
              toggle={toggle}
            />
          ))}
        </ul>
      )}
    </div>
  );
}

const mapStateToProps = (state) => ({
  todos: state.todos,
  loading: state.loading,
});

const mapDispatchToProps = (dispatch) => ({
  getList: () => dispatch(getList()),
  addTodo: (newTitle) => dispatch(addTodo(newTitle)),
  deleteTodo: (id) => dispatch(deleteTodo(id)),
  updateTodo: (id, newTitle) => dispatch(updateTodo(id, newTitle)),
  toggleDone: (id, currentDoneStatus) =>
    dispatch(toggleDone(id, currentDoneStatus)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
