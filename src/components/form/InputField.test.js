import React from 'react';
import { render } from '@testing-library/react';
import InputField from './InputField';

it('renders', () => {
    render(<InputField 
      message={{ content: 'asdf', type: 'neutral' }}
    />);
});
