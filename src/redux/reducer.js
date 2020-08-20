const todo = (state = { todos: [], loading: true }, action) => {
  switch (action.type) {
    case 'GET_TODO_LIST':
      return {
        ...state,
        loading: false,
        todos: action.payload,
      };

    default:
      return state;
  }
};

export default todo;
