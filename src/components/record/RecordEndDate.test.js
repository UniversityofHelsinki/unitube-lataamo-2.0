import React from 'react';
import { render } from '@testing-library/react';
import RecordEndDate from './RecordEndDate';

  const endDate = '';
  const  message = {
    content: '',
    type: ['light', 'neutral', 'warning']
  }
it('renders', () => {
  render(<RecordEndDate endDate={endDate} onChange={() => {}} message={message} />);
});
