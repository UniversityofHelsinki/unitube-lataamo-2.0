import React from 'react';
import {render} from '@testing-library/react';
import {axe} from 'jest-axe';

import CollectionCardThumbnail from './CollectionCardThumbnail';


describe('CollectionCardThumbnail', () => {
    const record = {};

    it('should not have any accessibility violations', async () => {
        const { container } = render(<CollectionCardThumbnail record={record} />);
        const results = await axe(container);

        // use the matcher function in the test
        expect(results).toHaveNoViolations();
    });
});
