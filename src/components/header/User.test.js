import React from 'react';
import { render } from '@testing-library/react';
import User from './User';
import { MockProvider } from '../../redux/reducers/MockProvider';

const reducers = {
  users: {
    user: {
      displayName: 'Keijo Keke',
      eppn: 'keijoke'
    }
  }
};

it('renders', () => {
  render(
    <MockProvider mockReducers={reducers}>
      <User />
    </MockProvider>
  );
});
