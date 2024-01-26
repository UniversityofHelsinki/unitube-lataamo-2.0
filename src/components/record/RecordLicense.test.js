import React from 'react';
import { render } from '@testing-library/react';
import RecordLicense from './RecordLicense';

  const license = '';
  const  message = {
    content: '',
    type: ['light', 'neutral', 'warning']
  };


it('renders', () => {
  render(<RecordLicense license={license} message={message} onChange={() => {}} />);
});
