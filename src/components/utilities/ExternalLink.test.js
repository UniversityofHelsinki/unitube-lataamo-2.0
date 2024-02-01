import React from 'react';
import { render } from '@testing-library/react';
import ExternalLink from "./ExternalLink";

const to = '';
const label = '';
const fill = '';
const height = 0;
const width = 0;

it('renders', () => {
    render(<ExternalLink to={to} label={label} fill={fill} height={height} width={width} />);
});
