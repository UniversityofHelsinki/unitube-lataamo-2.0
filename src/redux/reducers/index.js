import { combineReducers } from 'redux';

const example = (state = {}, action) => {
  if (action.type === "GET_RECORD") {
    return { ...state, record: { name: "video", id: action.payload }};
  }
  return state;
};

export default combineReducers({
  example
});
