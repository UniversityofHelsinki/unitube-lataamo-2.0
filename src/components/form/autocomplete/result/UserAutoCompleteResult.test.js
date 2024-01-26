import React from 'react';
import { render } from '@testing-library/react';
import UserAutoCompleteResult from './UserAutoCompleteResult';

  const user = {};
  const query = '';

it('renders', () => {
  render(<UserAutoCompleteResult user={user} query={query} />);
});
