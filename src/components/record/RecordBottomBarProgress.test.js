import React from 'react';
import { render } from '@testing-library/react';
import RecordBottomBarProgress from './RecordBottomBarProgress';

it('renders', () => {
  render(<RecordBottomBarProgress progress={{ status: 'STARTED' }} />);
});
