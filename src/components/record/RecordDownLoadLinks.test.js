import React from 'react';
import { render } from '@testing-library/react';
import RecordDownLoadLinks from "./RecordDownloadLinks";

const to = '';
const label = '';

it('renders', () => {
    render(<RecordDownLoadLinks to={to} label={label} />);
});
