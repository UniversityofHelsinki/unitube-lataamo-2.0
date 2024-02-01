import React from 'react';
import { render } from '@testing-library/react';
import LeftList from './LeftList';

it('renders', () => {
  render(<LeftList children={[<span key="1">adsf</span>]} />);
});
