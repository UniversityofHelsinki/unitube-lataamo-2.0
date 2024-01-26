import React from 'react';
import { render } from '@testing-library/react';
import CollectionPublicity from "./CollectionPublicity";

const published = 'julkaistu';
it('renders', () => {
    render(<CollectionPublicity published={published} />);
});
