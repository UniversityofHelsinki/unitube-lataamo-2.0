import React from 'react';
import { render } from '@testing-library/react';
import ClipBoardFormElement from "./ClipBoardFormElement";

const label = 'Otsikko';
const content = 'sisältö';
it('renders', () => {
    render(
      <ClipBoardFormElement 
        label={label} 
        content={content}>
      </ClipBoardFormElement>);
});
