import React from 'react';
import {render, screen, within} from '@testing-library/react';
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

    test('renders loading state when no video is provided', () => {
        const mockUseVideos = jest.fn().mockReturnValue([]);
        require('../../hooks/useVideos.js').default = mockUseVideos;

        render(<VideoPreview record={{ identifier: 'mock-identifier' }} />);

        expect(screen.getByText('Ladataan...')).toBeInTheDocument();
        expect(mockUseVideos).toHaveBeenCalledWith('mock-identifier');
    });

    test('renders video player when video is provided', () => {
        const mockUseVideos = jest.fn().mockReturnValue([{ ...mockVideo }]);
        require('../../hooks/useVideos.js').default = mockUseVideos;

        render(<VideoPreview record={{ identifier: 'mock-identifier' }} />);

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
        const mockUseVideos = jest.fn().mockReturnValue([{ ...mockVideo }]);
        require('../../hooks/useVideos.js').default = mockUseVideos;

        render(<VideoPreview record={{ identifier: 'mock-identifier' }} />);

        const videoPlayer = screen.getByTestId('video-player');
        userEvent.click(videoPlayer);
        expect(videoPlayer).toHaveAttribute('controls');
    });

});
