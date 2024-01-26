import React from 'react';
import { render } from '@testing-library/react';
import RecordIdentifier from './RecordIdentifier';

    const identifier = '';
it('renders', () => {
    render(<RecordIdentifier identifier={identifier} />);
});
