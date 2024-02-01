import React from 'react';
import { render } from '@testing-library/react';
import CollectionCardRecords from './CollectionCardRecords';

const records = [];

it('renders', () => {
  render(<CollectionCardRecords records={records} />);
});
