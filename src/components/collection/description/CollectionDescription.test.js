import React from 'react';
import { render } from '@testing-library/react';
import CollectionDescription from "./CollectionDescription";

it('renders', () => {
    render(<CollectionDescription description="lorem ipsum lore si daametti" />);
});
