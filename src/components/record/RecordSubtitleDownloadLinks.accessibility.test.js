import React from 'react';
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';

import RecordSubtitleDownloadLinks from './RecordSubtitleDownloadLinks';

// Extend Jest matchers
expect.extend(toHaveNoViolations);

describe('RecordSubtitleDownloadLinks', () => {

    test('should have no accessibility violations', async () => {
        const subtitles = [
            {id: '1', url: 'subtitle1.vtt', filename: 'Subtitle 1'},
            {id: '2', url: 'subtitle2.vtt', filename: 'Subtitle 2'},
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
