import React from 'react';
import { render } from '@testing-library/react';
import Highlight from './Highlight';

  const input = '';
  const what = '';

it('renders', () => {
  render(<Highlight input={input} what={what} />);
});
