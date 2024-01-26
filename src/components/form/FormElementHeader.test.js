import React from 'react';
import { render } from '@testing-library/react';
import FormElementHeader from './FormElementHeader';

const label = "Otsikko";
const size = "h5";
it('renders', () => {
    render(<FormElementHeader label={label} size={size}/>);
});
