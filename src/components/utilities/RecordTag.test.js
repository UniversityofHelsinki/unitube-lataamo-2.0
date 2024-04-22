import React from 'react';
import { render, screen } from '@testing-library/react';
import RecordTag from "./RecordTag";

it('renders', () => {
    render(<RecordTag label={'tag_deleted'} type='danger' />);
});
