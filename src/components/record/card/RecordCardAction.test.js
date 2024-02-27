import React from 'react';
import { render, screen } from '@testing-library/react';
import RecordCardAction from './RecordCardAction';
import { ReactComponent as RandomIcon } from '../../utilities/icons/alert.svg';

it('renders', () => {
  render(<RecordCardAction icon={<RandomIcon />} onClick={() => {}} label="Restore" />);
});
