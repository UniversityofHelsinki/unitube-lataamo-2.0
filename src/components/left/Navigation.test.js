import React from 'react';
import { render } from '@testing-library/react';
import Navigation from './Navigation';
import { MockProvider } from '../../redux/reducers/MockProvider';

const reducers = {
  location: {
    path: "/records"
  }
};

it('renders', () => {
  render(
    <MockProvider mockReducers={reducers}>
      <Navigation />
    </MockProvider>
  );
});
