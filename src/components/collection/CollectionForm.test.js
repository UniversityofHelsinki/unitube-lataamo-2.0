import React from 'react';
import { render } from '@testing-library/react';
import CollectionForm from './CollectionForm';
import { MockProvider } from '../../redux/reducers/MockProvider';

const reducers = {
  collections: {
    collection: {
      identifier: 'asdfasdf',
      title: 'hei'
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
      <CollectionForm />
    </MockProvider>
  );
});

