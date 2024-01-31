import React from 'react';
import { render } from '@testing-library/react';
import CollectionName from './CollectionName';

it('renders', () => {
    render(<CollectionName name="collection" />);
});
