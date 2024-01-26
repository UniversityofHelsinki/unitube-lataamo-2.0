import React from 'react';
import { render } from '@testing-library/react';
import RecordStaticInformation from './RecordStaticInformation';

  const record = {};
it('renders', () => {
  render(<RecordStaticInformation record={record} />);
});
