const todo = (state = { todos: [], loading: true }, action) => {
  switch (action.type) {
    case 'GET_TODO_LIST':
      return {
        ...state,
        loading: false,
        todos: action.payload,
      };

    case 'TODO_ADD':
      return {
        ...state,
        todos: [...state.todos, { title: action.payload, done: false }],
      };

    default:
      return state;
  }
};

export default todo;
