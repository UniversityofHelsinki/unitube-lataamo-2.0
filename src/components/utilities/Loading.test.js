import React from 'react';
import { render } from '@testing-library/react';
import Loading from './Loading';

it('renders', () => {
  render(<Loading loading={false}><p></p></Loading>);
});
