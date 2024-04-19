import React from 'react';
import { render } from '@testing-library/react';
import CollectionCardRecords from './CollectionCardRecords';
import { MockProvider } from '../../../redux/reducers/MockProvider';

const records = [];

it('renders', () => {
  render(
    <MockProvider>
      <CollectionCardRecords records={records} />
    </MockProvider>
  );
});
