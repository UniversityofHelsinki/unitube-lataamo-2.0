import React from 'react';
import { render } from '@testing-library/react';
import ProgressBar from './ProgressBar';

it('renders', () => {
  render(<ProgressBar now={12} label="asdf-label" alertMessage={<></>} type="error" />);
});
