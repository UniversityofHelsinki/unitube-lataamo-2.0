const initialState = {
  searchParameters: Object.fromEntries(
    new URLSearchParams(window.location.search).entries()
  ),
  path: window.location.pathname
};

const locationReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_LOCATION':
      return { ...state, path: action.payload };
    case 'SET_QUERY_PARAMETERS':
      return { ...state, searchParameters: action.payload };
    default:
      return state;
  }
};

export default locationReducer;
