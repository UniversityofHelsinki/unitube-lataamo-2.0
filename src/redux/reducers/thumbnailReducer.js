
const thumbnailReducer = (state = { urls: {} }, action) => {
  switch (action.type) {
    case 'SET_THUMBNAIL':
      return { 
        ...state, 
        urls: { 
          ...state.urls, 
          [action.payload.identifier]: action.payload.thumbnail
        }
      };
    case 'CLEAR_THUMBNAIL':
      return {
        ...state,
        urls: {
          ...state.urls,
          [action.payload.identifier]: undefined
        }
      };
    default:
      return state;
  };
}

export default thumbnailReducer;
