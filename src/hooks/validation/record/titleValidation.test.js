import React from 'react';
import { render } from '@testing-library/react';
import validateTitle from "./titleValidation";

const title = '';
const record = {};

it('renders', () => {
    render(<validateTitle title={title} record={record} />);
});
