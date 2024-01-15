import React from 'react';
import { render } from '@testing-library/react';
import ClipBoadFormHeader from "./ClipBoardFormHeader";

const label = 'Otsikko';
const size = 'h5';
it('renders', () => {
    render(<ClipBoadFormHeader label={label} size={size}><p></p></ClipBoadFormHeader>);
});
