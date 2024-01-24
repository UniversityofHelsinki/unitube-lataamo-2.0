import React from 'react';
import { render } from '@testing-library/react';
import Dialog from './Dialog';

it('renders', () => {
  render(<Dialog showComponent={<span></span>} show={false} hide={() => {}}><></></Dialog>);
});
