import React from 'react';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';

import RecordSubtitleDownloadLinks from './RecordSubtitleDownloadLinks';

describe('RecordSubtitleDownloadLinks', () => {

    test('should have no accessibility violations', async () => {
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
                }},
        ];

        const mockFn = jest.fn();

        const { container } = render(
            <RecordSubtitleDownloadLinks
                subtitles={subtitles}
                onChange={mockFn}
                resetSubtitleDownloadLinks={mockFn}
            />
        );

        const results = await axe(container);

        expect(results).toHaveNoViolations();
    });
});
