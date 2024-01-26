import React from 'react';
import { render } from '@testing-library/react';
import CollectionCard from './CollectionCard';

const collection = {};
const selected = false;

it('renders', () => {
  render(<CollectionCard collection={collection} onClick={() => {}} selected={selected} />);
});
