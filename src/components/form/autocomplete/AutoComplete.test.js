import React from 'react';
import { render } from '@testing-library/react';
import AutoComplete from './AutoComplete';

  const options = {};
  const placeholder = '';

it('renders', () => {
  render(<AutoComplete options={} onFilter={() => {}} placeholder={placeholder} onSelect={() => {}} />);
});
