
import { render } from '@testing-library/react';
import React from 'react';
import { MockProvider } from '../../../redux/reducers/MockProvider';
import RecordBulkActions from './RecordBulkActions';

it('renders', () => {
  render(
    <MockProvider>
      <RecordBulkActions records={[]} selectedRecords={[]} />
    </MockProvider>
  );
});
