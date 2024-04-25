import React from 'react';
import { render } from '@testing-library/react';
import CollectionCard from './CollectionCard';
import { MockProvider } from '../../../redux/reducers/MockProvider';

const collection = { visibility: [ 'status_private', 'status_moodle' ]};
const selected = false;

const reducers = {
  collections: {
    collection: {
      identifier: 'asdfasdf',
      title: 'asdf'
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
        <CollectionCard collection={collection} onClick={() => {}} selected={selected} />
      </MockProvider>);
});
