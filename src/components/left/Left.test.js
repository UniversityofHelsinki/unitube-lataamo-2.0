import React from 'react';
import { render } from '@testing-library/react';
import Left from './Left';
import { MockProvider } from '../../redux/reducers/MockProvider';

const reducers = {
  collections: {},
  records: {
    records: []
  },
  location: {
    path: '/records'
  }
};

it('renders', () => {
  render(
    <MockProvider mockReducers={reducers}>
      <Left />
    </MockProvider>
  );
});
