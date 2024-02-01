import React from 'react';
import { render } from '@testing-library/react';
import Loading from './Loading';

  const renderChildren = false;
  const children = {};

it('renders', () => {
  render(<Loading loading={false} children={children} renderChildren={renderChildren} ><p></p></Loading>);
});
