import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ReleaseNotesDialog from './ReleaseNotesDialog';
import useReleaseNotes from '../../hooks/useReleaseNotes';

jest.mock('../../hooks/useReleaseNotes');

const mockReleaseNotes = [
    { tag_name: "v1.0", released_at: "2022-07-07", description: "Initial release" },
    { tag_name: "v1.1", released_at: "2022-08-08", description: "Update" },
]

describe('ReleaseNotesDialog', () => {
    beforeEach(() => {
        useReleaseNotes.mockImplementation(() => mockReleaseNotes);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('renders without crashing', () => {
        const { container } = render(<ReleaseNotesDialog label="Test Label" />);
        expect(container).toBeInTheDocument();
    });

});
