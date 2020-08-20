import React from 'react';
import './styles/TodoList.css';
import axios from 'axios';

import { connect } from 'react-redux';
import { getList } from '../redux/actions';
import { TODOS_API } from '../data/api';

import TodoCreateForm from './TodoCreateForm';
import Todo from './Todo';
import Spinner from './Spinner';

function TodoList({ loading, todos, getList }) {
  const create = (newTitle) => {
    axios
      .post(TODOS_API, {
        name: newTitle,
      })
      .then((response) => {
        console.log(response.data);
        getList();
      })
      .catch((error) => console.log(error));
  };

  const update = (id, newTitle) => {
    axios
      .patch(`${TODOS_API}/${id}`, {
        name: newTitle,
      })
      .then((response) => {
        console.log(response.data);
        getList();
      })
      .catch((error) => console.log(error));
  };

  const destroy = (id) => {
    axios
      .delete(`${TODOS_API}/${id}`)
      .then((response) => {
        console.log(response.data);
        getList();
      })
      .catch((error) => console.log(error));
  };

  const toggle = (id) => {
    const currentDoneStatus = todos.find((todo) => todo.id === id).done;
    axios
      .put(`${TODOS_API}/${id}`, {
        done: !currentDoneStatus,
      })
      .then((response) => {
        console.log(response.data);
        getList();
      })
      .catch((error) => console.log(error));
  };

  React.useEffect(() => {
    getList();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="TodoList">
      <h1>TodoList</h1>
      <TodoCreateForm create={create} />
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
});

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
