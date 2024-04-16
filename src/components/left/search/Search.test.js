import React from 'react';
import { render } from '@testing-library/react';
import Search from './Search';

it('renders', () => {
  render(<Search options={{ searchValue: '' }} />);
});
