import React from 'react';
import { render } from '@testing-library/react';
import RecordLicense from './RecordLicense';


it('renders', () => {
  render(<RecordLicense license={'asdf'} message={{ content: 'asdf', type: 'neutral' }} onChange={() => {}} />);
});
