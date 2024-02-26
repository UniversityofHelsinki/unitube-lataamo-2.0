import React from 'react';
import { render, screen } from '@testing-library/react';
import NewCollectionProgressBar from './NewCollectionProgressBar';
import { ProgressStatus } from '../../Constants';

it('renders', () => {
  render(<NewCollectionProgressBar progress={
    { status: ProgressStatus.COLLECTION_SAVE.SENDING, percentage: 23 }
  } />);
});
