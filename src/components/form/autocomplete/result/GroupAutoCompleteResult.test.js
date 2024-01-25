import React from 'react';
import { render } from '@testing-library/react';
import GroupAutoCompleteResult from './GroupAutoCompleteResult';

  const group = {};
  const query = '';

it('renders', () => {
  render(<GroupAutoCompleteResult group={group} query={query} />);
});
