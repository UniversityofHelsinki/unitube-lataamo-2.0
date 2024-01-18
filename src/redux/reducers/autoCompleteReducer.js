

const autoCompleteReducer = (state = {
  users: [],
  groups: []
}, action) => {
  switch (action.type) {
    case 'SET_USERS':
      return { ...state, users: action.payload };
    case 'CLEAR_USERS':
      return { ...state, users: [] };
    case 'SET_GROUPS':
      return { ...state, groups: action.payload };
    case 'CLEAR_GROUPS':
      return { ...state, groups: [] };
    default:
      return state;
  }
};

export default autoCompleteReducer;
