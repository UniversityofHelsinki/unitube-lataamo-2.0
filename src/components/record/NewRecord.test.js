import React from 'react';
import { render } from '@testing-library/react';
import NewRecord from './NewRecord';
import { MockProvider } from '../../redux/reducers/MockProvider';

it('renders', () => {
  render(
    <MockProvider mockReducers={{ records: { records: [] }}}>
      <NewRecord />
    </MockProvider>
  );
});
