import React from 'react';
import { render } from '@testing-library/react';
import RecordName from './RecordName';

    const name = '';
    const  message = {
        content: '',
        type: ['light', 'neutral', 'warning']
    }
it('renders', () => {
    render(<RecordName name={name} onChange={() => {}} message={message} />);
});
