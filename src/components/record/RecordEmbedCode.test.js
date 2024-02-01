import React from 'react';
import { render } from '@testing-library/react';
import RecordEmbedCode from "./RecordEmbedCode";

it('renders', () => {
    render(<RecordEmbedCode 
      identifier="aaaa-bbbb-cccc-eeee-ffff-0000" 
    />);
});
