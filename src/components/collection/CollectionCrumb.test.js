import React from 'react';
import { render } from '@testing-library/react';
import CollectionCrumb from './CollectionCrumb';
import { MockProvider } from '../../redux/reducers/MockProvider';

it('renders', () => {
  render(<MockProvider mockReducers={{ location: { location: '', searchParams: {}} }}>
    <CollectionCrumb collection={{ id: '123123', title: 'collection' }} />
  </MockProvider>);
});
