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
    records: [{
      identifier: 'test-record-id',
      title: 'Test recording',
      description: 'Test description',
      deletionDate: new Date().toISOString(),
      created: new Date().toISOString(),
      license: 'UNITUBE-ALLRIGHTS',
      series: 'test-series-id'
    }]
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
