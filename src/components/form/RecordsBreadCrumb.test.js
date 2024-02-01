import React from 'react';
import { render } from '@testing-library/react';
import RecordsBreadCrumb from "./RecordsBreadCrumb";

it('renders', () => {
    render(<RecordsBreadCrumb crumbs={['eka', 'toka']} />);
});
