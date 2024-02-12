import React from 'react';
import {render} from '@testing-library/react';
import {axe, toHaveNoViolations} from 'jest-axe';

import CollectionCardRecord from './CollectionCardRecord';

// extend expect with toHaveNoViolations function
expect.extend(toHaveNoViolations);

describe('CollectionCardRecord', () => {
    const record = {};

    it('should not have any accessibility violations', async () => {
        const { container } = render(<CollectionCardRecord record={record} />);
        const results = await axe(container);

        // use the matcher function in the test
        expect(results).toHaveNoViolations();
    });
});
