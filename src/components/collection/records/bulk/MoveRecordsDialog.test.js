import React from 'react';
import { render, screen } from '@testing-library/react';
import MoveRecordsDialog from './MoveRecordsDialog';
import { MockProvider } from '../../../../redux/reducers/MockProvider';

it('renders', () => {
	render(
    <MockProvider>
      <MoveRecordsDialog />
    </MockProvider>
	);
});

