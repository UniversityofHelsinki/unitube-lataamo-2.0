import React from 'react';
import { render, screen } from '@testing-library/react';
import CollectionBottomBarProgress from './CollectionBottomBarProgress';

it('renders', () => {
  render(<CollectionBottomBarProgress progress={{ status: 'NOT_STARTED', percentage: 100 }} />);
});
