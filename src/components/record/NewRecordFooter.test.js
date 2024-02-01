import React from 'react';
import { render } from '@testing-library/react';
import NewRecordFooter from './NewRecordFooter';
import { ProgressStatus } from '../../Constants';

it('renders', () => {
  render(
    <NewRecordFooter 
      onClick={() => {}} 
      onCancel={() => {}} 
      progress={{ status: ProgressStatus.NOT_STARTED, percentage: 0 }} 
      isValid={true} />
  );
});
