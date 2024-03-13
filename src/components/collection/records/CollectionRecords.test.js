import React from 'react';
import { render } from '@testing-library/react';
import CollectionRecords from './CollectionRecords';
import { MockProvider } from '../../../redux/reducers/MockProvider';

it('renders', () => {
  render(
    <MockProvider>
      <CollectionRecords records={[{ identifier: 'sadf', name: 'asdfasf' }, { identifier: 'fdsa', title: 'hei' }]} />
    </MockProvider>
  );

});
