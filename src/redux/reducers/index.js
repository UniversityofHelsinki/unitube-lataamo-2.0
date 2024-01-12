import { combineReducers } from 'redux';

import locationReducer from './locationReducer';
import recordReducer from './recordReducer';

const reducers = {
  location: locationReducer,
  records: recordReducer
};

export default combineReducers(reducers);
