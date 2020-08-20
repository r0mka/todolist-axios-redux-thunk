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
      dispatch({ type: 'GET_TODO_LIST', payload: fetchedList });
    })
    .catch((error) => console.log(error));
