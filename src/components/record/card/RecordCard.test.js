import React from 'react';
import { render } from '@testing-library/react';
import RecordCard from './RecordCard';

  const record = {};
  const selected = false;

it('renders', () => {
  render(<RecordCard record={record} onClick={() => {}} selected={selected} />);
});
