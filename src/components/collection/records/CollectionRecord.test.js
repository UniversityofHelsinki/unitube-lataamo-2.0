import React from 'react';
import { render } from '@testing-library/react';
import CollectionRecord from './CollectionRecord';
import { MockProvider } from '../../../redux/reducers/MockProvider';

it('renders', () => {
  render(
    <MockProvider>
      <CollectionRecord 
        record={{ identifier: 'asdf', title: 'hei' }}
        disabled={false}
        reloadCollectionOnRemove={false}
      />
    </MockProvider>
  );
});
