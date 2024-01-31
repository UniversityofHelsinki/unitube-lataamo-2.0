import React from 'react';
import { render } from '@testing-library/react';
import GroupAutoCompleteResult from './GroupAutoCompleteResult';

it('renders', () => {
  render(<GroupAutoCompleteResult group={{ grpName: 'grp-hy-test' }} query="grp-" />);
});
