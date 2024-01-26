import React from 'react';
import { render } from '@testing-library/react';
import TextArea from './TextArea';

    const value = '';
    const message = {
        content: '',
        type: []
};

it('renders', () => {
    render(<TextArea value={value} message={message} />);
});
