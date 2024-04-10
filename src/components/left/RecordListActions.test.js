import React from 'react';
import { render, screen } from '@testing-library/react';
import RecordListActions from './RecordListActions';
import { MockProvider } from '../../redux/reducers/MockProvider';

it('renders', () => {
  render(
    <MockProvider mockReducers={{ records: { records: [] } }}>
      <RecordListActions options={{ showDeleted: false, showRecordsInCollections: false }}
                         records={[{ identifier: 'sadf', title: 'asdfasf' }, { identifier: 'fdsa', title: 'hei' }]}
                         loadingRecords = {true}
                         onOptionChange={() => {}} />
    </MockProvider>
  );
});

