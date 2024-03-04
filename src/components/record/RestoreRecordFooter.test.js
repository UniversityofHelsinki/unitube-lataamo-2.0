import React from 'react';
import { render, screen } from '@testing-library/react';
import RestoreRecordFooter from './RestoreRecordFooter';
import { ProgressStatus } from '../../Constants';

it('renders', () => {
  render(<RestoreRecordFooter 
    progress={{ 
      status: ProgressStatus.RECORD_RESTORE.NOT_STARTED, 
      percentage: 100 
    }} />
  );
});
