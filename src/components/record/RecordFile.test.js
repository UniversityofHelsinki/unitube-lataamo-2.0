import React from 'react';
import { render } from '@testing-library/react';
import RecordFile from './RecordFile';

  const  message = {
    content: '',
    type: ['light', 'neutral', 'warning']
  }
it('renders', () => {
  render(<RecordFile message={message} onChange={() => {}} />);
});
