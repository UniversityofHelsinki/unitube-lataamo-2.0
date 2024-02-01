import React from 'react';
import { render } from '@testing-library/react';
import RecordEndDate from './RecordEndDate';

it('renders', () => {
  render(
    <RecordEndDate 
      endDate={new Date().toISOString()} 
      onChange={() => {}} 
      message={{ content: 'asdf', type: 'neutral' }} 
    />);
});
