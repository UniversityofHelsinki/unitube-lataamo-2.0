import React from 'react';
import { render, screen } from '@testing-library/react';
import BulkActionDialog from './BulkActionDialog';
import { MockProvider } from '../../../../redux/reducers/MockProvider';

it('renders', () => {
	render(
    <MockProvider>
      <BulkActionDialog records={[]} openerProps={{ variant: '', label: 'est' }} recordsTableProps={{}} />
    </MockProvider>
	);
});

