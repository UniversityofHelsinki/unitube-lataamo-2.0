import React from 'react';
import {render} from '@testing-library/react';
import {axe} from 'jest-axe';

import CollectionDescription from './CollectionDescription';


describe('CollectionDescription', () => {
    it('should not have any accessibility violations', async () => {

        const { container } = render(<CollectionDescription description="lorem ipsum lore si daametti"/>);
        const results = await axe(container);

        // use the matcher function in the test
        expect(results).toHaveNoViolations();
    });
});
