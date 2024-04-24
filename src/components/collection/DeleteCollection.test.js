import React from 'react';
import { render, screen } from '@testing-library/react';
import { MockProvider } from '../../redux/reducers/MockProvider';
import DeleteCollection from "./DeleteCollection";

it('renders', () => {
    render(
        <MockProvider>
            <DeleteCollection collection={{
                identifier: 'asdf-asdf',
                title: 'asdf',
            }}
                          showLabel={true}
                          reloadCollectionOnRemove={false}
            />
        </MockProvider>
    );
});
