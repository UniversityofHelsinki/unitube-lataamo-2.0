import React from 'react';
import { render } from '@testing-library/react';
import CollectionRecord from './CollectionRecord';
import { MockProvider } from '../../../redux/reducers/MockProvider';

it('renders', () => {
  render(
    <MockProvider mockReducers={{ location: { location: '', searchParams: {}}}}>
      <CollectionRecord 
        record={{ identifier: 'asdf', title: 'hei' }}
        onRemove={() => {}}
      />
    </MockProvider>
  );
});
