import React from 'react';
import { render } from '@testing-library/react';
import TextArea from './TextArea';

it('renders', () => {
    render(<TextArea 
      value="asdf"
      onChange={() => {}}
      message={{ content: 'asdf', type: 'neutral' }} />);
});
