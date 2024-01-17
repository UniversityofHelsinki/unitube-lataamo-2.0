
const recordReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SET_RECORD':
      return { ...state, record: action.payload };
    case 'SET_RECORDS':
      return { ...state, records: action.payload };
    default:
      return state;
  };
}

export default recordReducer;
