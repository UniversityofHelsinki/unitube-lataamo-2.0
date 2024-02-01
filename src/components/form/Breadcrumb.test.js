import React from 'react';
import { render } from '@testing-library/react';
import Breadcrumb from './Breadcrumb';

it('renders', () => {
    render(<Breadcrumb crumbs={['eka', 'toka']} />);
});
