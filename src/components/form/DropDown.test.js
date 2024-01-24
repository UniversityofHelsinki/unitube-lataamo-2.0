import React from 'react';
import { render } from '@testing-library/react';
import DropDown from './DropDown';
it('renders', () => {
    const defaultValue = "Valitse";
    const optionsarray = [ {value: 1, label: 'One'},  {value: 2, label: 'Two'},  {value: 3, label: 'Three'}];

    render(<DropDown  defaultValue={defaultValue} optionsarray={optionsarray}/>);
});
