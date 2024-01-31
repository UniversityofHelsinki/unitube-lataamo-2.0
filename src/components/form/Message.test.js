import React from 'react';
import { render } from '@testing-library/react';
import Message from './Message';

it('renders', () => {
  render(<Message type="neutral">asdf</Message>);
});
