import React from 'react';
import { render } from '@testing-library/react';
import RecordForm from './RecordForm';

  const record = {};
it('renders', () => {
  render(<RecordForm record={record} />);
});
