import React from 'react';
import { render } from '@testing-library/react';
import RecordDescription from './RecordDescription';
import PropTypes from "prop-types";

    const description = '';
    const  message = {
        content: '',
        type: ['light', 'neutral', 'warning']
    }

it('renders', () => {
    render(<RecordDescription description={} message={message} onChange={() => {}} />);
});
