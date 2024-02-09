import React from 'react';
import { render } from '@testing-library/react';
import RecordSubtitleFile from "./RecordSubtitleFile";

it('renders', () => {
    render(
        <RecordSubtitleFile onChange={() => {}} message={{ content: 'asdfdf', type: 'neutral' }} disabled={false} />
    );
});
