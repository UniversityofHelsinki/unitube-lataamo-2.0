import React from 'react';
import { render } from '@testing-library/react';
import RecordBottomBarProgress from './RecordBottomBarProgress';
import { ProgressStatus } from '../../Constants';

it('renders', () => {
  render(<RecordBottomBarProgress progress={{ status: ProgressStatus.RECORD_SAVE.NOT_STARTED }} />);
});
