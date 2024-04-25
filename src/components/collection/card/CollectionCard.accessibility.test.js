import React from 'react';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import { MockProvider } from '../../../redux/reducers/MockProvider';

import CollectionCard from './CollectionCard';

const reducers = {
    collections: {
        collection: {
            identifier: 'asdfasdf',
            title: 'asdf'
        }
    },
    location: {
        searchParameters: {
            record: 'asdfasdf'
        },
        path: '/records'
    }
};

describe('CollectionCard', () => {
    it('should not have any accessibility violations', async () => {
      const collection = { identifier: 'asdf', title: 'asdf', visibility: [ 'status_private', 'status_moodle' ] };
        const selected = false;

        const { container } = render(
            <MockProvider mockReducers={reducers}>
                <CollectionCard collection={collection} onClick={() => {}} selected={selected}/>
            </MockProvider>
        );
        const results = await axe(container);

        // use the matcher function in the test
        expect(results).toHaveNoViolations();
    });
});
