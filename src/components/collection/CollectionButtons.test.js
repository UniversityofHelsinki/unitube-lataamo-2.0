import React from 'react';
import { render } from '@testing-library/react';
import CollectionButtons from "./CollectionButtons";

it('renders', () => {
    render(<CollectionButtons identifier={'1234567'}  />);
});
