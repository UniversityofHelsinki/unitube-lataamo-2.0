import React from 'react';
import { render } from '@testing-library/react';
import RecordAutomaticSubtitleFile from "./RecordAutomaticSubtitleFile";

it('renders', () => {
    render(
        <RecordAutomaticSubtitleFile onChange={() => {}} message={{ content: 'asdfdf', type: 'neutral' }} disabled={false}  languagemodel={''} language={'fi'}  />
    );
});
