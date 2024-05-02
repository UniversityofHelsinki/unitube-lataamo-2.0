import React from 'react';
import { render, screen } from '@testing-library/react';
import DateView from './DateView';

it('renders', () => {
  render(
    <DateView date={new Date().toISOString()} />
  );
});
