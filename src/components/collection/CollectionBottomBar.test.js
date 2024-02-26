import React from 'react';
import { render } from '@testing-library/react';
import CollectionBottomBar from './CollectionBottomBar';
import { ProgressStatus } from '../../Constants';

it('renders', () => {
  render(<CollectionBottomBar progress={{ status: ProgressStatus.COLLECTION_SAVE.NOT_STARTED, percentage: 0 }} modified={false} disabled={false} isValid={true} undo={() => {}} collection={{ identifier: 'asdf' }} />);
});
