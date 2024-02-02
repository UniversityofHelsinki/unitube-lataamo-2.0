import React from 'react';
import { render } from '@testing-library/react';
import CollectionsBreadCrumb from "./CollectionsBreadCrumb";
import { MockProvider } from '../../redux/reducers/MockProvider';

it('renders', () => {
    render(
      <MockProvider mockReducers={{ location: { location: '', searchParams: {}}}}>
        <CollectionsBreadCrumb collection={{ identifier: 'asdf', title: 'mo' }} />
      </MockProvider>
    );
});
