const visibilityReducer = (state = { left: true, right: true }, action) => {
  switch (action.type) {
    case 'SET_LEFT_VISIBILITY':
      return { ...state, left: action.payload };
    case 'SET_RIGHT_VISIBILITY':
      return { ...state, right: action.payload };
    default:
      return state;
  }
};

export default visibilityReducer;
