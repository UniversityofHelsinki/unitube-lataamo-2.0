import React from 'react';
import { render } from '@testing-library/react';
import AutoCompleteOptionContainer from './AutoCompleteOptionContainer';

it('renders', () => {
  render(<AutoCompleteOptionContainer options={[]} />);
});
