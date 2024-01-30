import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import VideoPreview from './VideoPreview';
import useVideos from "../../hooks/useVideos";

jest.mock('../../hooks/useVideos', () => ({
    __esModule: true,
    default: jest.fn(),
}));

describe('VideoPreview', () => {
    it('renders VideoPreview with a video', () => {
        const mockVideo = { url: 'mockVideoUrl' };
        // Mocking the response of useVideos hook
        useVideos.mockReturnValue([mockVideo]);

        render(<VideoPreview record={{ identifier: 'mockIdentifier' }} />);

        // Assert that the video player is rendered
        expect(screen.getByTestId('video-player')).toBeInTheDocument();

        // Additional assertions
        expect(screen.queryByText('Loading...')).not.toBeInTheDocument(); // Ensure loading text is not present
        expect(screen.getByText(/English/i)).toBeInTheDocument();

        // You can add more assertions based on your specific implementation
    });

    it('renders VideoPreview without a video', () => {
        // Mocking the response of useVideos hook with an empty array
        useVideos.mockReturnValue([]);

        render(<VideoPreview record={{ identifier: 'mockIdentifier' }} />);

        // Add assertions for the absence of video player or for rendering a placeholder
        expect(screen.getByText('Loading...')).toBeInTheDocument();
        expect(screen.queryByTestId('video-player')).not.toBeInTheDocument(); // Ensure video player is not present

        // You can add more assertions based on your specific implementation
    });
});
