import React from 'react';
import {render} from '@testing-library/react';
import {axe} from 'jest-axe';

import CollectionCardRecords from './CollectionCardRecords';


describe('CollectionCardRecord', () => {
    const records = [];

    it('should not have any accessibility violations', async () => {
        const { container } = render(<CollectionCardRecords records={records} />);
        const results = await axe(container);

        // use the matcher function in the test
        expect(results).toHaveNoViolations();
    });
});

