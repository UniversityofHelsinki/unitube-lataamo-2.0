import React from 'react';
import { render, screen } from '@testing-library/react';
import CardTag from './CardTag';

it('renders', () => {
  render(<CardTag label={'tag_deleted'} type='danger' />);
});
