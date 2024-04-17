import React from 'react';
import { render, screen, within} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import VideoPreview from './VideoPreview';

jest.mock('../../hooks/useVideos.js', () => ({
    __esModule: true,
    default: jest.fn(),
}));

describe('VideoPreview component', () => {
    const mockVideo = {
        url: 'mock-video-url',
        vttFile: {
            url: 'mock-vtt-url',
        },
    };

    beforeEach(() => {
        jest.resetAllMocks();
    });



    test('renders video player when video is provided', () => {
        render(<VideoPreview video={{
            "id": "c42dbb0b-3b42-41a8-b912-ac051fe8aa52",
            "type": "text/vtt",
            "mimetype": "text/vtt",
            "tags": {
                "tag": "archive"
            },
            "url": "mock-video-url",
            "checksum": {
                "type": "md5",
                "$": "1119c82aa88d57d7ddd2e7aa804b25a5"
            },
            "track": "WEBVTT\n\n00:00:00.500 --> 00:00:02.000\nThe Web is always changing\n\n00:00:02.500 --> 00:00:04.300\nand the way we access it is changing\n",
            "filename": "sample.vtt",
            "vttFile": {
                "url": "mock-vtt-url"
            }
        }} />);

        const videoPlayer = screen.getByTestId('video-player');
        expect(videoPlayer).toBeInTheDocument();

        const sourceElement = within(videoPlayer).getByTestId('source');
        expect(sourceElement).toHaveAttribute('src', `${process.env.REACT_APP_LATAAMO_PROXY_SERVER}/api/video/play/mock-video-url`);

        const captionTrack = screen.getByTestId('caption-track');
        expect(captionTrack).toBeInTheDocument();
        expect(captionTrack).toHaveAttribute('src', `${process.env.REACT_APP_LATAAMO_PROXY_SERVER}/api/vttFile/mock-vtt-url`);
        expect(captionTrack).toHaveAttribute('label', 'On');
    });

    test('handles play button click', () => {
        render(<VideoPreview video={{
            "id": "c42dbb0b-3b42-41a8-b912-ac051fe8aa52",
            "type": "text/vtt",
            "mimetype": "text/vtt",
            "tags": {
                "tag": "archive"
            },
            "url": "mock-video-url",
            "checksum": {
                "type": "md5",
                "$": "1119c82aa88d57d7ddd2e7aa804b25a5"
            },
            "track": "WEBVTT\n\n00:00:00.500 --> 00:00:02.000\nThe Web is always changing\n\n00:00:02.500 --> 00:00:04.300\nand the way we access it is changing\n",
            "filename": "sample.vtt",
            "vttFile": {
                "url": 'mock-vtt-url',
            },
        }} />);

        const videoPlayer = screen.getByTestId('video-player');
        userEvent.click(videoPlayer);
        expect(videoPlayer).toHaveAttribute('controls');
    });

});
