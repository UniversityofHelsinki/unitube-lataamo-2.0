import { combineReducers } from 'redux';

import locationReducer from './locationReducer';
import recordReducer from './recordReducer';
import collectionReducer from './collectionReducer';
import userReducer from './userReducer';
import autoCompleteReducer from './autoCompleteReducer';
import videoReducer from './videoReducer';

const reducers = {
  location: locationReducer,
  records: recordReducer,
  collections: collectionReducer,
  users: userReducer,
  autocompletion: autoCompleteReducer,
  video: videoReducer,
};

export default combineReducers(reducers);
