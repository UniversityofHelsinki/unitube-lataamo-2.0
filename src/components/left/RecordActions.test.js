import React from 'react';
import { render, screen } from '@testing-library/react';
import RecordActions from './RecordActions';
import { MockProvider } from '../../redux/reducers/MockProvider';

it('renders', () => {
  render(
    <MockProvider mockReducers={{ records: { records: [] } }}>
      <RecordActions />
    </MockProvider>
  );
});

