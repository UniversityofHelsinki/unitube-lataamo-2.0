import React from 'react';
import { render } from '@testing-library/react';
import Record from './Record';
import { MockProvider } from '../../redux/reducers/MockProvider';

const reducers = {
  records: {
    record: {
      identifier: 'asdfasdf',
      deletionDate: new Date().toISOString()
    }
  },
  location: {
    searchParameters: {
      record: 'asdfasdf'
    },
    path: '/records'
  }
};

it('renders', () => {
  render(
    <MockProvider mockReducers={reducers}>
      <Record />
    </MockProvider>
  );
});
