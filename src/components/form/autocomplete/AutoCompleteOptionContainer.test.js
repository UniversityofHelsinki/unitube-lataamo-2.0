import React from 'react';
import { render } from '@testing-library/react';
import AutoCompleteOptionContainer from './AutoCompleteOptionContainer';

  const show = false;

it('renders', () => {
  render(<AutoCompleteOptionContainer options={[]} show={show} onSelect={() => {}} />);
});
