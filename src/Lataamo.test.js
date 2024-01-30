import React from 'react';
import { render } from '@testing-library/react';
import Lataamo from './Lataamo';
import { MockProvider } from './redux/reducers/MockProvider';

const reducers = {
  users: {
    user: { displayName: 'Teppo Tester', eppn: 'teste' }
  },
  location: {
    path: '/records',
    searchParameters: {} 
  },
  records: {
    records: []
  },
  collections: {
    collections: []
  }
};

it('renders', () => {
  render(
    <MockProvider mockReducers={reducers}>
      <Lataamo />
    </MockProvider>
  );
});
