const errorReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    case 'CLEAR_ERROR':
      return { ...state, error: undefined };
    default:
      return state;
  }
};

export default errorReducer;
