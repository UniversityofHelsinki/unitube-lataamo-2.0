
const collectionReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SET_COLLECTION':
      return { ...state, collection: action.payload };
    case 'SET_COLLECTIONS':
      return { ...state, collections: action.payload };
    case 'SET_COLLECTION_DROPDOWN':
      return { ...state, collectionDropDown: action.payload };
    default:
      return state;
  };
};

export default collectionReducer;
