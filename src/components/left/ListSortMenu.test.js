import React from 'react';
import { render, screen } from '@testing-library/react';
import ListSortMenu from './ListSortMenu';

it('renders', () => {
  render(
    <ListSortMenu currentCriteria="asdf" criterias={["asdf", "fdsa"]} descending={false} onSelect={() => {}} />
  );
});
