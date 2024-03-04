import React from 'react';
import { render, screen } from '@testing-library/react';
import RecordName from './RecordName';

const DefaultRecordName = (override) => 
  <RecordName 
      name="Record"
      onChange={() => {}} 
      message={{ content: 'test-message', type: 'neutral' }} 
      { ...override } />;

describe('Record\'s name', () => {

  it('renders', () => {
    render(<DefaultRecordName />);
  });

  it('shows the record name on the input field', () => {
    render(<DefaultRecordName name="test-name" />);
    expect(screen.queryByDisplayValue('test-name')).toBeVisible();
  });

});
