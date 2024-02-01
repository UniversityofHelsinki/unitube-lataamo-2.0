import React from 'react';
import { render } from '@testing-library/react';
import DropDown from './DropDown';
it('renders', () => {
    render(<DropDown 
      options={[{ value: 'asdf', label: 'fdsa' }]} 
      message={{ content: 'asdfdf', type: 'neutral' }}
    />);
});
