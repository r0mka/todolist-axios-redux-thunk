import React, { useState } from 'react';
import './TodoList.css';
import arrayMove from 'array-move';
import axios from 'axios';
import TodoCreateForm from './TodoCreateForm';
import { SortableContainer } from 'react-sortable-hoc';
import SortableTodo from './SortableTodo';
import Spinner from './Spinner';
import { connect } from 'react-redux';
import { getList, addTodo, deleteTodo } from '../redux/actions';

const SortableList = SortableContainer(
  ({ list, update, destroy, toggleDone, move }) => {
    return (
      <ul>
        {list.map((todo, index) => (
          <SortableTodo
            key={todo.id}
            list={list}
            index={index}
            position={{ index: index, last: list.length - 1 }}
            id={todo.id}
            title={todo.title}
            done={todo.done}
            update={update}
            destroy={destroy}
            toggleDone={toggleDone}
            move={move}
          />
        ))}
      </ul>
    );
  }
);

function TodoList(props) {
  const { loading, todos, getList, addTodo, deleteTodo } = props;

  const url = 'https://sleepy-taiga-81385.herokuapp.com/todo';

  const fetchAndUpdateList = () => {
    // return axios
    //   .get(url)
    //   .then((response) => {
    //     const newList = response.data.map(
    //       ({ _id, name, done, description }) => ({
    //         id: _id,
    //         title: name,
    //         done,
    //         description,
    //       })
    //     );
    //     setList(newList);
    //     return Promise.resolve();
    //   })
    //   .catch((error) => console.log(error));
  };

  const update = (id, newTitle) => {
    // const currentDoneStatus = list.find((todo) => todo.id === id).done;
    // axios
    //   .patch(`${url}/${id}`, {
    //     name: newTitle,
    //     done: currentDoneStatus,
    //   })
    //   .then((response) => {
    //     console.log(response.data);
    //     fetchAndUpdateList();
    //   })
    //   .catch((error) => console.log(error));
  };

  const toggleDone = (id) => {
    // const currentDoneStatus = list.find((todo) => todo.id === id).done;
    // axios
    //   .put(`${url}/${id}`, {
    //     done: !currentDoneStatus,
    //   })
    //   .then((response) => {
    //     console.log(response.data);
    //     fetchAndUpdateList();
    //   })
    //   .catch((error) => console.log(error));
  };

  const onSortEnd = ({ oldIndex, newIndex }) => {
    // setList((items) => arrayMove(items, oldIndex, newIndex));
  };

  const shouldCancelStart = (e) => {
    const nodeNames = ['svg', 'path', 'BUTTON', 'INPUT'];
    if (nodeNames.includes(e.target.nodeName)) return true;
  };

  // React.useEffect(() => {
  //   console.count('IN USE EFFECT');
  //   fetchAndUpdateList().then((res) => setLoading(false));
  // }, []);

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
        <SortableList
          list={todos}
          update={update}
          destroy={(id) => deleteTodo(id)}
          toggleDone={toggleDone}
          onSortEnd={onSortEnd}
          shouldCancelStart={shouldCancelStart}
          helperClass="text-color-during-drag"
        />
      )}
    </div>
  );
}

const mapStateToProps = (state) => ({
  todos: state.todos,
  loading: state.loading,
});

const mapDispatchToProps = (dispatch) => ({
  addTodo: (newTitle) => dispatch(addTodo(newTitle)),
  deleteTodo: (id) => dispatch(deleteTodo(id)),
  getList: () => dispatch(getList()),
});

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
