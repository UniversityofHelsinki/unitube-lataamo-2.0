import React from 'react';
import { render } from '@testing-library/react';
import HelpDialog from './HelpDialog';

it('renders', () => {
  render(<HelpDialog label="help-dialog-test"><span>hi</span></HelpDialog>);
});
