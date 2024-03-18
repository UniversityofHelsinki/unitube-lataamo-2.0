import React from 'react';
import { render } from '@testing-library/react';
import Left from './Left';
import { MockProvider } from '../../redux/reducers/MockProvider';

it('renders', () => {
  render(
    <MockProvider> 
      <Left />
    </MockProvider>
  );
});
