import React from 'react';
import { render, screen } from '@testing-library/react';
import HyMenuLabel from './HyMenuLabel';
import { ReactComponent as RandomIcon } from '../utilities/icons/alert.svg';

it('renders', () => {
  render(
    <HyMenuLabel Icon={RandomIcon} caretUp={false}>
      <span>hei</span>
    </HyMenuLabel>
  );
});
