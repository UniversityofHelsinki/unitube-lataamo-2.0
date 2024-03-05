import React from 'react';
import { render, screen } from '@testing-library/react';
import DeleteRecord from './DeleteRecord';
import { MockProvider } from '../../redux/reducers/MockProvider';

it('renders', () => {
  render(
    <MockProvider>
      <DeleteRecord record={{ 
        identifier: 'asdf-asdf', 
        title: 'asdf'
      }} />
    </MockProvider>
  );
});
