import React from 'react';
import { render } from '@testing-library/react';
import CollectionDescription from "./CollectionDescription";

const description = 'kuvaus';
it('renders', () => {
    render(<CollectionDescription description={description} />);
});
