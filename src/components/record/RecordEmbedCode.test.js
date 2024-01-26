import React from 'react';
import { render } from '@testing-library/react';
import RecordEmbedCode from "./RecordEmbedCode";
import PropTypes from "prop-types";

    const identifier = '';
it('renders', () => {
    //render(<RecordEmbedCode label={label} size={size} code={codeexample} language={language} showLineNumbers={showLineNumbers} theme={theme} />);
    render(<RecordEmbedCode identifier={identifier} />);
});
