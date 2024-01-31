import React from 'react';
import { render } from '@testing-library/react';
import RecordCard from './RecordCard';

it('renders', () => {
  render(<RecordCard 
    record={{ identifier: 'asdf', title: 'hello' }} 
    onClick={() => {}} 
    selected={false} />);
});
