import React from 'react';
import { render, screen } from '@testing-library/react';
import RecordsTable from './RecordsTable';
import NotificationProvider from '../notification/NotificationContext';

it('renders', () => {
  render(
    <NotificationProvider>
      <RecordsTable 
        records={[]} 
        selectedRecords={[]} 
        onSelect={() => {}}
        disabled={false}
        containerRef={{}}
      />
    </NotificationProvider>
  );
});
