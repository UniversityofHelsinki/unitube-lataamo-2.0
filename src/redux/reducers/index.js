import { combineReducers } from 'redux';

import locationReducer from './locationReducer';
import recordReducer from './recordReducer';
import collectionReducer from './collectionReducer';
import autoCompleteReducer from './autoCompleteReducer';

const reducers = {
  location: locationReducer,
  records: recordReducer,
  collections: collectionReducer,
  autocompletion: autoCompleteReducer,
};

export default combineReducers(reducers);
