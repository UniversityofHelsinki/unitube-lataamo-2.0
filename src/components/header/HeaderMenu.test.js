import React from 'react';
import { render, screen } from '@testing-library/react';
import HeaderMenu from './HeaderMenu';
import { MockProvider } from '../../redux/reducers/MockProvider';

it('renders', () => {
  render(
    <MockProvider>
      <HeaderMenu />
    </MockProvider>
  );
});
