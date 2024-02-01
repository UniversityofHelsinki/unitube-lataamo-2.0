import React from 'react';
import { render } from '@testing-library/react';
import RecordIdentifier from './RecordIdentifier';

it('renders', () => {
    render(<RecordIdentifier identifier="ffff-eeee-0000-a2a2-efef" />);
});
