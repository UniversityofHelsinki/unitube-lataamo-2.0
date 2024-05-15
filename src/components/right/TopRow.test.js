import React from 'react';
import { render, screen } from '@testing-library/react';
import TopRow from './TopRow';
import { MockProvider } from '../../redux/reducers/MockProvider';

it('renders', () => {
  render(
    <MockProvider>
      <TopRow />
    </MockProvider>
  );
});
