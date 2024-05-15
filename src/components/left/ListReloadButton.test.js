import React from 'react';
import { render, screen } from '@testing-library/react';
import ListReloadButton from './ListReloadButton';
import { MockProvider } from '../../redux/reducers/MockProvider';

it('renders', () => {
  render(
    <MockProvider>
      <ListReloadButton />
    </MockProvider>
  );
});
