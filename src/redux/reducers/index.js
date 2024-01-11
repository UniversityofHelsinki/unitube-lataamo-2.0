import { combineReducers } from 'redux';

const example = (state = {}, action) => {
  if (action.type === "GET_RECORD") {
    return { ...state, record: { name: "video", id: action.payload }};
  }
  return state;
};

const reducers = {
  example
};

export default combineReducers(reducers);
