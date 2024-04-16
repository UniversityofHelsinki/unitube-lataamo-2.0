import React from 'react';
import { render, screen } from '@testing-library/react';
import HyMenu from './HyMenu';

it('renders', () => {
  render(
    <HyMenu disabledItems={[]} selectedItems={[0]} onSelect={() => {}} buttonLabel="test">
      <span>test menu item</span>
      <span>test menu item 1</span>
    </HyMenu>
  );
});
