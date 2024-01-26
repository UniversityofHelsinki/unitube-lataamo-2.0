import React from 'react';
import { render } from '@testing-library/react';
import validateFile from "./fileValidation";

const license = '';
const record = {};

it('renders', () => {
    render(<validateFile license={license} record={record} />);
});
