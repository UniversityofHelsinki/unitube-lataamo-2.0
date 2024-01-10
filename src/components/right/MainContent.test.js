import React from 'react';
import { render } from '@testing-library/react';
import MainContent from './MainContent';
import { MockProvider } from '../../redux/reducers/MockProvider';

it('renders', () => {
  render(
    <MockProvider mockReducers={{ example: { record: 'asf' } }}>
      <MainContent />
    </MockProvider>
  );
});

