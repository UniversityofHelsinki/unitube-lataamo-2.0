import React from 'react';
import {render} from '@testing-library/react';
import {axe} from 'jest-axe';

import CollectionCardRecord from './CollectionCardRecord';
import { MockProvider } from '../../../redux/reducers/MockProvider';


describe('CollectionCardRecord', () => {
    const record = {};

    it('should not have any accessibility violations', async () => {
        const { container } = render(
          <MockProvider>
            <CollectionCardRecord record={record} />
          </MockProvider>
        );
        const results = await axe(container);

        // use the matcher function in the test
        expect(results).toHaveNoViolations();
    });
});
