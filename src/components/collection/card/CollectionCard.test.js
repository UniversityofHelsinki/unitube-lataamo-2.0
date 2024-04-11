import React from 'react';
import { render } from '@testing-library/react';
import CollectionCard from './CollectionCard';

const collection = { visibility: [ 'status_private', 'status_moodle' ]};
const selected = false;

it('renders', () => {
  render(<CollectionCard collection={collection} onClick={() => {}} selected={selected} />);
});
