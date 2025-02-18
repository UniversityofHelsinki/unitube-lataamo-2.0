import React from 'react';
import { render, screen } from '@testing-library/react';
import DeleteRecordsDialog from './DeleteRecordsDialog';
import { MockProvider } from '../../../../redux/reducers/MockProvider';

it('renders', () => {
	render(
    <MockProvider>
      <DeleteRecordsDialog />
    </MockProvider>
	);
});

