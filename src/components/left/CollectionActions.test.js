import React from 'react';
import { render, screen } from '@testing-library/react';
import CollectionActions from './CollectionActions';
import { MockProvider } from '../../redux/reducers/MockProvider';

it('renders', () => {
  render(
    <MockProvider mockReducers={{ 
          collections: {
            collections: [] 
          }, users: { 
            user: { eppn: 'asdf' } 
          },
          location: {
            path: '/collections',
            searchParameters: { collection: '' }
          }
        }}>
      <CollectionActions />
    </MockProvider>
  );
});
