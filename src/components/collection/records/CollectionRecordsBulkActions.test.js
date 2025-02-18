import React from 'react';
import { render, screen } from '@testing-library/react';
import CollectionRecordsBulkActions from './CollectionRecordsBulkActions';
import { MockProvider } from '../../../redux/reducers/MockProvider';

it('renders', () => {
  render(
    <MockProvider>
      <CollectionRecordsBulkActions records={[]} selectedRecords={[]} />
    </MockProvider>
  );
});
