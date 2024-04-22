import React from 'react';
import { render } from '@testing-library/react';
import CollectionCardRecord from './CollectionCardRecord';
import { MockProvider } from '../../../redux/reducers/MockProvider';

const record = {};

it('renders', () => {
  render(
    <MockProvider>
      <CollectionCardRecord record={record} />
    </MockProvider>
  );
});
