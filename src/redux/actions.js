import axios from 'axios';

const url = 'https://sleepy-taiga-81385.herokuapp.com/todo';

function fetchTodos(dispatch) {
  axios
    .get(url)
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
}

export function getList() {
  return (dispatch) => fetchTodos(dispatch);
}

export function addTodo(newTitle) {
  return (dispatch) => {
    axios
      .post(url, {
        name: newTitle,
      })
      .then((response) => {
        console.log(response.data);
        return fetchTodos(dispatch);
      })
      .catch((error) => console.log(error));
  };
}

export const deleteTodo = (id) => (dispatch) => {
  axios
    .delete(`${url}/${id}`)
    .then((response) => {
      console.log(response.data);
      return fetchTodos(dispatch);
    })
    .catch((error) => console.log(error));
};
