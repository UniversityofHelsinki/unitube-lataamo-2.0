import { combineReducers } from 'redux';

import locationReducer from './locationReducer';
import recordReducer from './recordReducer';
import collectionReducer from './collectionReducer';
import userReducer from './userReducer';
import autoCompleteReducer from './autoCompleteReducer';
import videoReducer from './videoReducer';
import statisticsReducer  from "./statisticsReducer";
import statisticReducer from "./statisticReducer";
import thumbnailReducer from './thumbnailReducer';

const reducers = {
  location: locationReducer,
  records: recordReducer,
  collections: collectionReducer,
  users: userReducer,
  autocompletion: autoCompleteReducer,
  video: videoReducer,
  thumbnails: thumbnailReducer,
  statistics : statisticsReducer,
  statistic : statisticReducer
};

export default combineReducers(reducers);
