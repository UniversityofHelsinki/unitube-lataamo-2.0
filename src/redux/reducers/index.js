import { combineReducers } from 'redux';

import locationReducer from './locationReducer';
import recordReducer from './recordReducer';
import collectionReducer from './collectionReducer';
import userReducer from './userReducer';

const reducers = {
  location: locationReducer,
  records: recordReducer,
  collections: collectionReducer,
  users: userReducer
};

export default combineReducers(reducers);
