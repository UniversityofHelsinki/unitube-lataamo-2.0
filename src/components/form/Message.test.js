import React from 'react';
import { render, screen } from '@testing-library/react';
import Message from './Message';

it('renders', () => {
  render(<Message type="neutral">asdf</Message>);
});

it('shows the message', () => {
  render(<Message type="neutral">asdf</Message>);
  expect(screen.getByText('asdf')).toBeInTheDocument();
});

it('does not show anything if type is not specified', () => {
});

it('does not show anything if type is not specified', () => {
  render(<Message type={undefined}>
    asfd
  </Message>);
  expect(screen.queryByText('asfd')).not.toBeInTheDocument();
});
