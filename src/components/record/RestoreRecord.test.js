import React from 'react';
import { render, screen } from '@testing-library/react';
import RestoreRecord from './RestoreRecord';
import { MockProvider } from '../../redux/reducers/MockProvider';

it('renders', () => {
  render(
    <MockProvider>
      <RestoreRecord record={{ identifier: 'asdf-asdf', title: 'asdf' }} />
    </MockProvider>
  );
});
