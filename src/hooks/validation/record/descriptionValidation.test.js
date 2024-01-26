import React from 'react';
import { render } from '@testing-library/react';
import validateDescription from "./descriptionValidation";

const description = '';
const record = {};
it('renders', () => {
    render(<validateDescription description={description} record={record} />);
});
