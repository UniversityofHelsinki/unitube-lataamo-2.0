import React from "react";
import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";
import { thunk } from "redux-thunk";
import lataamoReducer from '.';
import PropTypes from 'prop-types';
import NotificationProvider from "../../components/notification/NotificationContext";

const mockRecord = {
  identifier: 'test-record-id',
  title: 'Test recording',
  description: 'Test description',
  deletionDate: new Date().toISOString(),
  created: new Date().toISOString(),
  license: 'UNITUBE-ALLRIGHTS',
  series: 'test-series-id'
};

const mockCollection = {
  identifier: 'test-series-id',
  description: 'Test series description',
  title: 'Test collection',
  contributors: ['baabenom', 'grp-hy-test'],
  iamgroups: ['grp-hy-test'],
  persons: ['baabenom'],
  moodleNumbers: ['12345', '67890'],
  eventColumns: [{
    id: 'test-record-id',
    title: 'Testi recording'
  }],
  published: "",
  visibility: []
};

const mockStatistic = {
  username: 'mansikka',
  room:17,
  start_timestamp:1682313704000,
  end_before_timestamp:1682313724000,
  maxViewers:"-",
  location:"Bio2 1041",
  length:20000
};


const mockUser = {
  eppn: 'baabenom',
  hyGroupCn: ['hy-employees', 'hyad-employees'],
  preferredLanguage: '',
  displayName: 'Baabe Nomypeevo'
};

const mockAutocompletionResultUser = {
  firstName: 'Baabe',
  lastName: 'Nomypeevo',
  userName: 'baabenom',
  email: 'baabe.nomypeevo@helsinki.fi'
};

const mockAutocompletionResultGroup = {
  grpName: 'grp-a02700-ohtu',
  description: 'I\'m an autocomplete result'
};

const mockVideo = {
  "id": "c42dbb0b-3b42-41a8-b912-ac051fe8aa52",
  "url": "MmZmYWM0YzViNGEzMWEyNDQzYzk3YWVkNTllZTM4MjM4ODllN2RmZGMzNjc1NTUxMTI=",
  "filename": "sample.vtt"
};

const defaultMockReducers = {
  location: {
    path: '/records',
    searchParameters: {
      record: 'test-record-id'
    }
  },
  records: {
    records: [mockRecord],
    record: mockRecord
  },
  collections: {
    collections: [mockCollection],
    collection: mockCollection
  },
  users: {
    user: mockUser
  },
  autocompletion: {
    users: [mockAutocompletionResultUser],
    groups: [mockAutocompletionResultGroup]
  },
  video: {
    videos: [mockVideo]
  },
  thumbnails: {
    urls: {}
  },
  statistics: {
    statistics : [mockStatistic],
    statistic: mockStatistic
  },
  visibilities: {
    left: true,
    right: true
  }
};

export const MockProvider = ({ children, mockReducers }) => {
  return (
    <Provider store={createStore(() => ({ ...lataamoReducer, ...defaultMockReducers, ...mockReducers }), applyMiddleware(thunk))}>
      <NotificationProvider>
        {children}
      </NotificationProvider>
    </Provider>
  );
};

MockProvider.propTypes = {
  children: PropTypes.object.isRequired,
  mockReducers: PropTypes.object,
};
