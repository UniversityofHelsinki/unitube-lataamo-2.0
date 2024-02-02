import React from 'react';
import { render } from '@testing-library/react';
import CollectionRecords from './CollectionRecords';
import { MockProvider } from '../../../redux/reducers/MockProvider';

it('renders', () => {
  render(
    <MockProvider mockReducers={{ location: { location: '', searchParams: {}}}}>
      <CollectionRecords records={[{ identifier: 'sadf', name: 'asdfasf' }, { identifier: 'fdsa', title: 'hei' }]} />
    </MockProvider>
  );

});
