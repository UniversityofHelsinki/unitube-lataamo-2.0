import React from 'react';
import { render } from '@testing-library/react';
import NewRecordProgress from './NewRecordProgress';
import { ProgressStatus } from '../../Constants';

it('renders', () => {
  render(<NewRecordProgress progress={{ status: ProgressStatus.NOT_STARTED, percentage: 0 }} />);
});
