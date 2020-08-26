import React from 'react';
import './styles/TodoList.css';
import axios from 'axios';
// import styled from 'styled-components';

import { connect } from 'react-redux';
import { getList } from '../redux/actions';
import { TODOS_API } from '../data/api';

import { DragDropContext, Droppable } from 'react-beautiful-dnd';

import TodoCreateForm from './TodoCreateForm';
import Todo from './Todo';
import Spinner from './Spinner';

function TodoList({ loading, todos, todoOrderData, getList, onSortEnd }) {
  const create = (newTitle) => {
    axios
      .post(TODOS_API, {
        name: newTitle,
        todoOrderPayload: todoOrderData,
      })
      .then((response) => {
        console.log(response.data);
        getList();
      })
      .catch((error) => console.log(error));
  };

  const destroy = (id) => {
    const newTodoOrderData = {
      ...todoOrderData,
      todoOrder: todoOrderData.todoOrder.filter((todoId) => todoId !== id),
    };

    axios
      .delete(`${TODOS_API}/${id}`, {
        data: {
          todoOrderPayload: newTodoOrderData,
        },
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

  const toggle = (id) => {
    const currentDoneStatus = todos[id].done;
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

  // React-beatiful-dnd dragging
  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const start = source.droppableId;
    const finish = destination.droppableId;

    if (start === finish) {
      // make a copy of array
      const newTodoOrder = todoOrderData.todoOrder.slice();
      newTodoOrder.splice(source.index, 1);
      newTodoOrder.splice(destination.index, 0, draggableId);

      // reorder elements in the state variable todoOrder
      onSortEnd(newTodoOrder);

      const newTodoOrderData = {
        ...todoOrderData,
        todoOrder: newTodoOrder,
      };

      //update todoOrder on the server
      axios
        .patch(`${TODOS_API}/${todoOrderData.id}`, {
          todoOrderPayload: newTodoOrderData,
        })
        .then((response) => {
          console.log(response.data);
          getList();
        })
        .catch((error) => console.log(error));
    }
  };

  React.useEffect(() => {
    getList();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="TodoList">
      <h1>Draggable Tasks</h1>
      <TodoCreateForm create={create} />
      {loading && <Spinner />}
      {!loading && (
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="todo-list">
            {(provided) => (
              <ul {...provided.droppableProps} ref={provided.innerRef}>
                {todoOrderData.todoOrder.map((todoId, index) => {
                  const todo = todos[todoId] || {
                    title: 'ID ERROR HAPPENED HERE',
                  };
                  return (
                    <Todo
                      key={todo.id}
                      id={todo.id}
                      index={index}
                      title={todo.title}
                      done={todo.done}
                      update={update}
                      destroy={destroy}
                      toggle={toggle}
                    />
                  );
                })}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
        </DragDropContext>
      )}
    </div>
  );
}

const mapStateToProps = (state) => ({
  todos: state.todos,
  todoOrderData: state.todoOrderData,
  loading: state.loading,
});

const mapDispatchToProps = (dispatch) => ({
  getList: () => dispatch(getList()),
  onSortEnd: (newTodoOrder) =>
    dispatch({ type: 'DRAG_SORT', payload: newTodoOrder }),
});

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
