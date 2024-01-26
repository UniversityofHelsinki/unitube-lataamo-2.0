import React from 'react';
import { render } from '@testing-library/react';
import CollectionName from './CollectionName';

const name = 'nimi'
it('renders', () => {
    render(<CollectionName name={name} />);
});
