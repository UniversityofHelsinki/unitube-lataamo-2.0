import React from 'react';
import { render } from '@testing-library/react';
import Right from './Right';
import { MockProvider } from '../../redux/reducers/MockProvider';

const reducers = {
  location: {
    searchParameters: {
      collection: 'asdfasdf'
    },
    path: '/records'
  },
  autocompletion: {
    users: [{ userName: 'baabenom' }],
    groups: [{ grpName: 'grp-hy-test' }]
  }
};

it('renders', () => {
  render(
    <MockProvider mockReducers={reducers}>
      <Right />
    </MockProvider>
  );
});
