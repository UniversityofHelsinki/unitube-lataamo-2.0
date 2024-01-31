import React from 'react';
import { render } from '@testing-library/react';
import RecordFile from './RecordFile';

it('renders', () => {
  render(<RecordFile message={{ content: 'asdf', type: 'neutral' }} onChange={() => {}} />);
});
