import axios from 'axios';

const TODOS_API = 'https://sleepy-taiga-81385.herokuapp.com/todo';

// Helper function. Fetches all todos and updates todos property on the state;
const fetchTodos = (dispatch) =>
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
      dispatch({ type: 'GET_TODO_LIST', payload: fetchedList });
    })
    .catch((error) => console.log(error));

export const getList = () => (dispatch) => fetchTodos(dispatch);

export const addTodo = (newTitle) => (dispatch) =>
  axios
    .post(TODOS_API, {
      name: newTitle,
    })
    .then((response) => {
      console.log(response.data);
      return fetchTodos(dispatch);
    })
    .catch((error) => console.log(error));

export const deleteTodo = (id) => (dispatch) =>
  axios
    .delete(`${TODOS_API}/${id}`)
    .then((response) => {
      console.log(response.data);
      return fetchTodos(dispatch);
    })
    .catch((error) => console.log(error));

export const updateTodo = (id, newTitle) => (dispatch) =>
  axios
    .patch(`${TODOS_API}/${id}`, {
      name: newTitle,
    })
    .then((response) => {
      console.log(response.data);
      return fetchTodos(dispatch);
    })
    .catch((error) => console.log(error));

export const toggleDone = (id, currentDoneStatus) => (dispatch) =>
  axios
    .put(`${TODOS_API}/${id}`, {
      done: !currentDoneStatus,
    })
    .then((response) => {
      console.log(response.data);
      return fetchTodos(dispatch);
    })
    .catch((error) => console.log(error));
