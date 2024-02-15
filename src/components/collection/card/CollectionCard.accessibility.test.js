import React from 'react';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';

import CollectionCard from './CollectionCard';


describe('CollectionCard', () => {
    it('should not have any accessibility violations', async () => {
        const collection = { identifier: 'asdf', title: 'asdf' };
        const selected = false;

        const { container } = render(<CollectionCard collection={collection} onClick={() => {}} selected={selected}/>);
        const results = await axe(container);

        // use the matcher function in the test
        expect(results).toHaveNoViolations();
    });
});
