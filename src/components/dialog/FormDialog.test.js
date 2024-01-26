import React from 'react';
import { render } from '@testing-library/react';
import FormDialog from './FormDialog';

  const touched = false;
  const show = false;
  const closeable = false;

it('renders', () => {
  render(<FormDialog touched={touched} show={show} closeable={closeable} children={<span></span>} hide={() => {}} reset={() => {}} showComponent={<span></span>} />);
});
