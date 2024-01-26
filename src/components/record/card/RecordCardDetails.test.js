import React from 'react';
import { render } from '@testing-library/react';
import RecordCardDetails from './RecordCardDetails';

  const record = {};
it('renders', () => {
  render(<RecordCardDetails record={record} />);
});
