import React from 'react';
import { render } from "@testing-library/react";

import RecordSubtitleDownloadLinks from './RecordSubtitleDownloadLinks';

// Test suite for RecordSubtitleDownloadLinks
describe('RecordSubtitleDownloadLinks', () => {

    // Sample test case
    test('should render download links for subtitles', () => {

        const subtitles = [
            {id: '1', url: 'subtitle1.vtt', filename: 'Subtitle 1', "tags": {
                    "tag": [
                        "archive",
                        "lang:fin"
                    ]
                }},
            {id: '2', url: 'subtitle2.vtt', filename: 'Subtitle 2', "tags": {
                    "tag": [
                        "archive",
                        "lang:eng"
                    ]
                }}
        ];

        const mockFn = jest.fn();

        const { getByText } = render(
                <RecordSubtitleDownloadLinks
                    subtitles={subtitles}
                    onChange={mockFn}
                    resetSubtitleDownloadLinks={mockFn}
                />
        );

        // Check if the subtitle links are rendered by finding them by their filenames.
        expect(getByText('Subtitle 1')).toBeInTheDocument();
        expect(getByText('Subtitle 2')).toBeInTheDocument();
    });
});
