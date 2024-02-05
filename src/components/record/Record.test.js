import React from 'react';
import { render } from '@testing-library/react';
import Record from './Record';
import { MockProvider } from '../../redux/reducers/MockProvider';

const reducers = {
  records: {
    record: {
      identifier: 'asdfasdf',
      deletionDate: new Date().toISOString(),
      media: [{ url: '' }],
      series: {
        title: 'asdf'
      }
    }
  },
  location: {
    searchParameters: {
      record: 'asdfasdf'
    },
    path: '/records'
  },
  collections: {
    collections: [{ identifier: 'asdf-asdf', title: 'asdfasdf' }]
  }
};

it('renders', () => {
  render(
    <MockProvider mockReducers={reducers}>
      <Record />
    </MockProvider>
  );
});
