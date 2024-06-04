import React from 'react';
import { render, screen } from '@testing-library/react';
import DeletionDateUpdateDialog from './DeletionDateUpdateDialog';
import { MockProvider } from '../../../../redux/reducers/MockProvider';

it('renders', () => {
	render(
    <MockProvider>
      <DeletionDateUpdateDialog />
    </MockProvider>
	);
});

