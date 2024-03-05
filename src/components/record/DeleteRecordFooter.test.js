import React from 'react';
import { render, screen } from '@testing-library/react';
import DeleteRecordFooter from './DeleteRecordFooter';
import { ProgressStatus } from '../../Constants';

it('renders', () => {
  render(
    <DeleteRecordFooter progress={{status: ProgressStatus.RECORD_DELETE.NOT_STARTED, percentage: 100 }} hide={console.log} />
  );
});
