import React from 'react';
import { render } from '@testing-library/react';
import InputField from './InputField';

const message = {
    content: '',
    type: []
};

it('renders', () => {
    render(<InputField message={message}/>);
});
