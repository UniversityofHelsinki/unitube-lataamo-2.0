import React from 'react';
import { render } from '@testing-library/react';
import ButtonRow from './ButtonRow';
import { MockProvider } from '../../redux/reducers/MockProvider';

it('renders', () => {
  render(
    <MockProvider>
      <ButtonRow />
    </MockProvider>
  );
});
