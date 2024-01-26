import React from 'react';
import { render } from '@testing-library/react';
import CollectionCardRecord from './CollectionCardRecord';

const record = {};

it('renders', () => {
  render(<CollectionCardRecord record={record} />);
});
