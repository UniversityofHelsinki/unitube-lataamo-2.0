import React from 'react';
import { render } from '@testing-library/react';
import Thumbnail from './Thumbnail';

const record = {};
it('renders', () => {
    render(<Thumbnail record={record} width={"100"} length={"100"} altText={"test"} ><p></p></Thumbnail>);
});
