import { combineReducers } from 'redux';

import locationReducer from './locationReducer';
import recordReducer from './recordReducer';
import collectionReducer from './collectionReducer';

const reducers = {
  location: locationReducer,
  records: recordReducer,
  collections: collectionReducer
};

export default combineReducers(reducers);
