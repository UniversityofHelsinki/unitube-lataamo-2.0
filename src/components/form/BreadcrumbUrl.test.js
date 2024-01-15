import React from 'react';
import { render } from '@testing-library/react';
import BreadcrumbUrl from './BreadcrumbUrl';

const crumbs = ['Tallenteet', 'Toka', 'Kolmas'];

it('renders', () => {
    render(<BreadcrumbUrl crumbs={crumbs}/>);
});
