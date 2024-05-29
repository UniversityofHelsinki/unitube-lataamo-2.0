import React from 'react';
import { render } from '@testing-library/react';
import { MockProvider } from '../../redux/reducers/MockProvider';
import TagClearButton from "./TagClearButton";

it('renders', () => {
    render(
        <MockProvider>
            <TagClearButton />
        </MockProvider>
    );
});
