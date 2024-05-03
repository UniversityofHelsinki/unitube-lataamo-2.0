import React from 'react';
import { render, screen } from '@testing-library/react';
import RecordsTable from './RecordsTable';

it('renders', () => {
  render(
    <RecordsTable 
      records={[]} 
      selectedRecords={[]} 
      onSelect={() => {}}
      disabled={false}
      containerRef={{}}
    />
  );
});
