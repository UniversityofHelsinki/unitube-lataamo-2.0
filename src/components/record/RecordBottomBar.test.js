import React from 'react';
import { render } from '@testing-library/react';
import RecordBottomBar from './RecordBottomBar';

it('renders', () => {
  render(<RecordBottomBar disabled={true} record={{}} save={() => {}} undo={() => {}} progress={{ status: 'NOT_STARTED' }} />);
});
