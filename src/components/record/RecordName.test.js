import React from 'react';
import { render } from '@testing-library/react';
import RecordName from './RecordName';

it('renders', () => {
    render(<RecordName 
      name="Record"
      onChange={() => {}} 
      message={{ content: 'test-message', type: 'neutral' }} />);
});
