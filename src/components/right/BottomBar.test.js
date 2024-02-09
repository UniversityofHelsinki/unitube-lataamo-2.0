import React from 'react';
import { render } from '@testing-library/react';
import BottomBar from './BottomBar';

it('renders', () => {
  render(<BottomBar notifications={<></>} buttons={<></>}/>);
});
