import React from 'react';
import { render } from '@testing-library/react';
import validateFile from "./fileValidation";

const file = {};
const record = {};

it('renders', () => {
    render(<validateFile file={file} record={record} />);
});
