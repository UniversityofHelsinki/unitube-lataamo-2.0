import React from 'react';
import { render, screen } from '@testing-library/react';
import CardTags from './CardTags';

it('renders', () => {
  render(<CardTags tags={[{ type: 'red', label: 'tag_deleted'}]} />);
});
