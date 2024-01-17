
const collectionReducer = (state = {}, action) => {
  switch (action.type) {
    case ('SET_COLLECTIONS'):
      return { ...state, collections: action.payload };
    default:
      return state;
  };
};

export default collectionReducer;
