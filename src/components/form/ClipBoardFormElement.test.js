import React from 'react';
import { render } from '@testing-library/react';
import ClipBoardFormElement from "./ClipBoardFormElement";

const label = 'Otsikko';
const size = 'h5';
it('renders', () => {
    render(<ClipBoardFormElement label={label} size={size}><p></p></ClipBoardFormElement>);
});
