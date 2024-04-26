import React from 'react';
import { render, screen } from '@testing-library/react';
import CollectionActions from './CollectionActions';
import { MockProvider } from '../../../redux/reducers/MockProvider';

it('renders', () => {
    render(
        <MockProvider mockReducers={{ users: { user: { eppn: 'baabenom' }}}}>
            <CollectionActions collection={{ series: 'asdf' }}/>
        </MockProvider>
    );
});
