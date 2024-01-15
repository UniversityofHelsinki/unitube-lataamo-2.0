import React from 'react';
import { render } from '@testing-library/react';
import InputField from './InputField';

const placeholder = 'otsikko';

it('renders', () => {
    render(<InputField placeholder={placeholder}/>);
});
