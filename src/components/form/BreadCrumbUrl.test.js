import React from 'react';
import { render } from '@testing-library/react';
import BreadCrumbUrl from './BreadCrumbUrl';

const crumbs = ['Tallenteet', 'Toka', 'Kolmas'];

it('renders', () => {
    render(<BreadCrumbUrl crumbs={crumbs}/>);
});
