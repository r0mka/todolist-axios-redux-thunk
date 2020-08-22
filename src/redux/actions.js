import axios from 'axios';
import { TODOS_API } from '../data/api';

export const getList = () => (dispatch) =>
  axios
    .get(TODOS_API)
    .then((response) => {
      const fetchedList = response.data.map(
        ({ _id, name, done, description }) => ({
          id: _id,
          title: name,
          done,
          description,
        })
      );

      const todoOrder = JSON.parse(fetchedList[0].description);
      const todoOrderId = fetchedList[0].id;

      const todoOrderData = {
        id: todoOrderId,
        todoOrder,
      };

      const todos = fetchedList.slice(1);

      const newTodoState = {
        todos: {},
        todoOrderData,
      };

      todos.forEach((todo) => {
        newTodoState.todos[todo.id] = todo;
      });

      dispatch({ type: 'GET_TODO_LIST', payload: newTodoState });
    })
    .catch((error) => console.log(error));
