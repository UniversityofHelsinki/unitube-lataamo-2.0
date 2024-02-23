import React from 'react';
import { render, screen } from '@testing-library/react';
import NewCollectionFooter from './NewCollectionFooter';
import { ProgressStatus } from '../../Constants';

it('renders', () => {
  render(<NewCollectionFooter progress={{ status: ProgressStatus.NEW_COLLECTION.SENDING, percentage: 23 }}/>);
});
