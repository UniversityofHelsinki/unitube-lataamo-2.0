import React from 'react';
import { render } from '@testing-library/react';
import RecordCollections from "./RecordCollections";

const  message = {
    content: '',
    type: ['light', 'neutral', 'warning']
};

it('renders', () => {
    render(<RecordCollections message={message} onChange={() => {}} />);
});
