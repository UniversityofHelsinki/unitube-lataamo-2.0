import React from 'react';
import { render, screen } from '@testing-library/react';
import InputField from './InputField';

const DefaultInputField = (override) => 
  <InputField 
    message={{ content: 'asdf', type: 'neutral' }}
    hideMessage={false} 
    { ...override } />

describe('input field', () => {
  it('renders', () => {
    render(<DefaultInputField />);
  });

  describe('input field\'s message box', () => {
    it('shows the message when one is given', () => {
      render(<DefaultInputField message={{ content: 'test-content', type: 'neutral' }}/>);
      expect(screen.queryByText('test-content')).toBeInTheDocument();
    });

    it('hides the message when told', () => {
      render(<DefaultInputField message={{ content: 'test-content', type: 'neutral' }} hideMessage={true} />);
      expect(screen.queryByText('test-content')).toBeNull();
    });
  });

});

