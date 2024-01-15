import React from 'react';
import { render } from '@testing-library/react';
import CodeBlockBox from "./CodeBlockBox";

const code = '<iframe src="https://unitube.it.helsinki.fi/unitube/embed.html?id=45ce69e0-1793-4494-8674-fff6d48f4a2f" scrolling="no" allowfullscreen="true" frameBorder="0" marginHeight="0px" ' +
    'marginWidth="0px" height="360" width="640"></iframe>';
const language = 'jsx';
const showLineNumbers = 'true';
const theme = 'github';

it('renders', () => {
    render(<CodeBlockBox code={code} language={language} showLineNumbers={showLineNumbers} theme={theme} ><p></p></CodeBlockBox>);
});
