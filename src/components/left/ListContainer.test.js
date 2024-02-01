import React from 'react';
import { render } from '@testing-library/react';
import ListContainer from './ListContainer';

it('renders', () => {
  render(
    <ListContainer children={[<span key="1">moi</span>]} />
  );
});
