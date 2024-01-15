import React from 'react';
import { render } from '@testing-library/react';
import RecordLink from './RecordLink';

const to = '#';
const linklabel = '\'https://unitube.it.helsinki.fi/21EC2020-3AEA-4069-A2DD-08002B30309D\'';
it('renders', () => {
    render(<RecordLink to={to} linklabel={linklabel} />);
});
