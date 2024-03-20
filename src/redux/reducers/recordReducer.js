
const recordReducer = (state = { loadingRecords: false }, action) => {
  switch (action.type) {
    case 'SET_RECORD':
      return { ...state, record: action.payload };
    case 'SET_RECORDS':
      return { ...state, records: action.payload };
    case 'SET_DELETED_RECORDS':
      return { ...state, deletedRecords: action.payload };
    case 'SET_ALL_RECORDS':
      return { ...state, allRecords: action.payload };
    default:
      return state;
  };
}

export default recordReducer;
