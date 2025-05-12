import React from 'react';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import VideoPreview from './VideoPreview';

// Mock i18next
jest.mock('react-i18next', () => ({
    useTranslation: () => ({
        t: (key) => key,
        i18n: {
            language: 'en'
        }
    })
}));

describe('VideoPreview component', () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });

    test('renders video player when video is provided', () => {
        render(<VideoPreview video={{
            url: 'mock-video-url',
            vttFiles: [{
                url: 'mock-vtt-url',
                tags: "archive",
                filename: 'sample.vtt'
            }]
        }} />);

        const videoPlayer = screen.getByTestId('video-player');
        expect(videoPlayer).toBeInTheDocument();

        const sourceElement = within(videoPlayer).getByTestId('source');
        expect(sourceElement).toHaveAttribute('src', `${process.env.REACT_APP_LATAAMO_PROXY_SERVER}/api/video/play/mock-video-url`);

        const captionTrack = screen.getByTestId('caption-track');
        expect(captionTrack).toBeInTheDocument();
        expect(captionTrack).toHaveAttribute('src', `${process.env.REACT_APP_LATAAMO_PROXY_SERVER}/api/vttFile/mock-vtt-url`);
        expect(captionTrack).toHaveAttribute('label', 'Archived');
    });

    test('handles play button click', () => {
        render(<VideoPreview video={{
            url: 'mock-video-url',
            vttFiles: [{
                url: 'mock-vtt-url',
                tags: "archive",
                filename: 'sample.vtt'
            }]
        }} />);

        const videoPlayer = screen.getByTestId('video-player');
        userEvent.click(videoPlayer);
        expect(videoPlayer).toHaveAttribute('controls');
    });
});
