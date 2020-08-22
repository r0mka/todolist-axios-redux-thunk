const todo = (
  state = { todos: {}, todoOrderData: {}, loading: true },
  action
) => {
  switch (action.type) {
    case 'GET_TODO_LIST':
      return {
        ...state,
        ...action.payload,
        loading: false,
      };

    case 'DRAG_SORT':
      return {
        ...state,
        todoOrderData: {
          ...state.todoOrderData,
          todoOrder: action.payload,
        },
      };
    default:
      return state;
  }
};

export default todo;
