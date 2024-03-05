
const recordReducer = (state = { loadingRecords: false }, action) => {
  switch (action.type) {
    case 'SET_RECORD':
      return { ...state, record: action.payload };
    case 'SET_RECORDS':
      return { ...state, records: action.payload, loadingRecords: false };
    case 'SET_LOADING_RECORDS':
      return { ...state, loadingRecords: action.payload };
    case 'SET_DELETED_RECORDS':
      return { ...state, deletedRecords: action.payload, loadingDeletedRecords: false };
    case 'SET_LOADING_DELETED_RECORDS':
      return { ...state, loadingDeletedRecords: action.payload };
    default:
      return state;
  };
}

export default recordReducer;
